import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { UlidMonotonic } from 'id128';
import moment from 'moment';

import { db, currentUserId } from './firebase-init';
import { BookingModel } from './model';

export async function emptyCompany(name, email, phone) {
  const ulid = UlidMonotonic.generate();
  await setDoc(doc(db, 'companyProfile', ulid.toRaw()), {
    name: name,
    email: email,
    phone: phone,
    company_id: ulid.toRaw(),
    owner_id: '',
    bill_id: '',
    image_id: '',
    meta: {
      is_active: true,
      create_date: new Date().toUTCString(),
      update_date: new Date().toUTCString(),
    },
    locations: [],
    employees: [],
    services: [],
  })
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
}

export async function getCompanyAlias(handle) {
  const companyRef = query(
    collection(db, 'redirect'),
    where('handle', '==', handle),
  );
  const companySnapshot = await getDocs(companyRef);
  if (companySnapshot.empty) {
    return null;
  }
  return companySnapshot.docs[0].data()['companyId'];
}

export async function scheduleBooking(
  company_id: string,
  location: any,
  employee: any,
  service: any,
  customer: any,
  date: Date,
  time: Date,
  failureCallback: any,
) {
  const ulid = UlidMonotonic.generate();
  const booking: BookingModel = {
    booking_id: ulid.toRaw(),
    company_id: company_id,
    meta: {
      create_date: new Date().toUTCString(),
      update_date: new Date().toUTCString(),
      status: 'pending',
      booking_type: 'online',
    },
    customer: {
      name: customer.name || `${customer.first_name} ${customer.last_name}`,
      first_name: customer.first_name || null,
      last_name: customer.last_name || null,
      email: customer.email || null,
      phone: customer.phone || null,
      customer_id: currentUserId(),
      address: customer.address || null,
      is_user: customer.is_user || false,
      member_id: customer.member_id || null,
      member_type: customer.member_type || null,
      member_status: customer.member_status || null,
    },
    details: {
      date: date,
      time: time,
      message: customer.message || null,
      extra: customer.extra || null,
      service: {
        service_id: service.service_id,
        service_name: service.name,
        service_price: service.price,
        service_duration: service.duration,
        service_image: service.image || null,
        request: service.request || null,
        extra: service.extra || null,
      },
      location: {
        location_id: location.location_id,
        location_name: location.name,
        location_address: location.address || null,
        location_phone: location.phone || null,
        location_email: location.email || null,
        location_image: location.image || null,
        location_extra: location.extra || null,
      },
      employee: {
        employee_id: employee.employee_id,
        employee_name:
          employee.name || `${employee.first_name} ${employee.last_name}`,
        employee_first_name: employee.first_name || null,
        employee_last_name: employee.last_name || null,
        employee_image: employee.image || null,
        employee_extra: employee.extra || null,
      },
    },
  };

  const scheduleDocRef = doc(
    db,
    'schedule',
    `${employee.employee_id}_${moment(date).format('YYYY-MM')}`,
  );
  const scheduleDoc = await getDoc(scheduleDocRef);
  let scheduleData = scheduleDoc.data() || {};
  let exists = false;
  let error = false;
  if (!customer) {
    failureCallback(true, 'Missing customer info');
    exists = true;
    error = true;
  } else {
    switch (true) {
      case !location:
        console.log('Missing location');
        failureCallback(true, 'Missing location');
        exists = true;
        error = true;
        break;
      case !employee:
        console.log('Missing employee');
        failureCallback(true, 'Missing employee');
        exists = true;
        error = true;
        break;
      case !service:
        console.log('Missing service');
        failureCallback(true, 'Missing service');
        exists = true;
        error = true;
        break;
      case !(date as any):
        console.log('Missing date');
        failureCallback(true, 'Missing date');
        exists = true;
        error = true;
        break;
      case !(time as any):
        console.log('Missing time');
        failureCallback(true, 'Missing time');
        exists = true;
        error = true;
        break;
    }
    if (!error) {
      for (let i in scheduleData[moment(date).format('DD')].bookings) {
        if (
          scheduleData[moment(date).format('DD')].bookings[i].time === time &&
          scheduleData[moment(date).format('DD')].bookings[i].duration ===
            service.duration &&
          scheduleData[moment(date).format('DD')].bookings[i].booking_id !==
            ulid.toRaw()
        ) {
          console.log('Booking already exists');
          exists = true;
          failureCallback(true, 'Booking already exists');
          return false;
        }
      }
      if (!exists) {
        scheduleData[`${moment(date).format('DD')}`].bookings.push({
          time: time,
          duration: service.duration || 0,
          booking_id: ulid.toRaw(),
        });
        await updateDoc(scheduleDocRef, scheduleData);
        await setDoc(doc(db, 'bookings', ulid.toRaw()), booking)
          .then(() => {})
          .catch(e => {
            console.log(e);
          });
        failureCallback(false, 'Booking created');
      }
    }
  }
}

export async function getEmployeeListByCompany(companyId) {
  const employeeRef = query(
    collection(db, 'employeeProfile'),
    where('company_id', '==', companyId),
  );
  let employeeList: any = [];
  await getDocs(employeeRef)
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          employeeList.push(doc.data());
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return employeeList;
}

export async function getEmployeeListByLocation(locationId) {
  const employeeRef = query(
    collection(db, 'locations'),
    where('location_id', '==', locationId),
  );
  let employeeList: any = [];
  await getDocs(employeeRef)
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          employeeList.push(doc.data()['employee']);
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return employeeList;
}

export async function getLocationsList(companyId) {
  const locationRef = query(
    collection(db, 'locations'),
    where('company_id', '==', companyId),
  );
  let locationList: any = [];
  await getDocs(locationRef)
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          locationList.push(doc.data());
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return locationList;
}

export async function getServiceListByEmployee(employeeId) {
  const employeeRef = query(
    collection(db, 'employeeProfile'),
    where('employee_id', '==', employeeId),
  );
  let employeeList: any = [];
  await getDocs(employeeRef)
    .then(querySnapshot => {
      querySnapshot.forEach(async empldoc => {
        if (empldoc.exists()) {
          empldoc.data()['services'].forEach(async serviceId => {
            const serviceRef = doc(db, 'serviceList', serviceId);
            await getDoc(serviceRef).then(doc => {
              if (doc.exists()) {
                employeeList.push(doc.data());
              }
            });
          });
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return employeeList;
}

export async function getServiceList(companyId) {
  const serviceRef = query(
    collection(db, 'serviceList'),
    where('company_id', '==', companyId),
  );
  let serviceList: any = [];
  await getDocs(serviceRef)
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          serviceList.push(doc.data());
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return serviceList;
}

export async function getBookingsByLocation(location_id) {
  const bookingRef = query(
    collection(db, 'bookings'),
    where('details.location.location_id', '==', location_id),
  );
  let bookingList: any = [];
  await getDocs(bookingRef)
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.exists()) {
          bookingList.push(doc.data());
        }
      });
    })
    .catch(e => {
      console.log(e);
    });
  return bookingList;
}

export async function getImage(path, imageId) {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `gs://syathen-dbc18-${path}/${imageId}_200x200.webp`,
  );
  let url = await getDownloadURL(storageRef);
  return url;
}

export async function generateTimeSlots(
  month: string,
  day: string,
  employeeId: string,
) {
  // Need to account for length of appointments so that they don't overlap
  function addMinutes(timeString: string, minutes: number): string {
    // Screw type safety
    const totalMinutes = +timeToMinutes(timeString) + +minutes;
    return minutesToTime(totalMinutes);
  }

  function timeToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(s => parseInt(s, 10));
    return hours * 60 + minutes;
  }

  function minutesToTime(minutes: number): string {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  // Get the employee's schedule document for the given month
  const scheduleDocRef = doc(db, 'schedule', `${employeeId}_${month}`);
  const scheduleDoc = await getDoc(scheduleDocRef);
  const scheduleData = scheduleDoc.data() || {};

  const dayData = scheduleData[day];

  const totalSlots = 24 * 4;
  const allSlots = Array.from({ length: totalSlots }, (_, i) => i);

  let availableSlots = [...allSlots];

  if (!dayData) {
    return [];
  }
  availableSlots = availableSlots.filter(
    slot =>
      !allSlots
        .slice(
          0,
          Math.ceil(timeToMinutes(dayData.start_time) / 15)
            ? Math.ceil(timeToMinutes('09:00') / 15)
            : undefined,
        )
        .includes(slot),
  );

  availableSlots = availableSlots.filter(
    slot =>
      !allSlots
        .slice(
          Math.ceil(timeToMinutes(dayData.end_time) / 15),
          Math.ceil(timeToMinutes('24:00') / 15)
            ? Math.ceil(timeToMinutes('24:00') / 15)
            : undefined,
        )
        .includes(slot),
  );

  if (dayData.bookings) {
    dayData.bookings.forEach(booking => {
      const startTime = booking.time;
      const endTime = addMinutes(startTime, booking.duration);

      const startSlot = Math.floor(timeToMinutes(startTime) / 15);
      const endSlot = Math.ceil(timeToMinutes(endTime) / 15);
      const occupiedSlots = allSlots.slice(
        startSlot,
        endSlot ? endSlot : undefined,
      );
      availableSlots = availableSlots.filter(
        slot => !occupiedSlots.includes(slot),
      );
    });
  }
  if (dayData.breaks) {
    dayData.breaks.forEach(booking => {
      const startTime = booking.time;
      const endTime = addMinutes(startTime, booking.duration);

      const startSlot = Math.floor(timeToMinutes(startTime) / 15);
      const endSlot = Math.ceil(timeToMinutes(endTime) / 15);
      const occupiedSlots = allSlots.slice(
        startSlot,
        endSlot ? endSlot : undefined,
      );
      availableSlots = availableSlots.filter(
        slot => !occupiedSlots.includes(slot),
      );
    });
  }

  function slotToTime(slot: number): string {
    const hour = Math.floor(slot / 4);
    const minute = (slot % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  const availableTimes = availableSlots.map(slot => slotToTime(slot));
  return availableTimes;
}
