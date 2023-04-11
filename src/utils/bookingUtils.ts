import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { UlidMonotonic } from 'id128';

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
  await setDoc(doc(db, 'bookings', ulid.toRaw()), booking)
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
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
