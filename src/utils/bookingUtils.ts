import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { UlidMonotonic } from 'id128';

import { db, currentUserId } from './firebase-init';

export async function emptyCompany(name, email) {
  const ulid = UlidMonotonic.generate();
  await setDoc(doc(db, 'companyProfile', ulid.toRaw()), {
    name: name,
    email: email,
    companyId: ulid.toRaw(),
    ownerId: '',
    billId: '',
    active: true,
    imageId: '',
    createDate: Date.now(),
    updateDate: Date.now(),
    locations: [],
    employees: [],
    services: [],
  })
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
}

export async function scheduleBooking(
  companyId: string,
  locationId: string,
  serviceId: string,
  employeeId: string,
  date: number,
  time: number,
) {
  const ulid = UlidMonotonic.generate();
  await setDoc(doc(db, 'bookings', ulid.toRaw()), {
    bookingId: ulid.toRaw(),
    companyId: companyId,
    locationId: locationId,
    serviceId: serviceId,
    employeeId: employeeId,
    date: date,
    time: time,
    createDate: Date.now(),
    updateDate: Date.now(),
    status: 'pending',
    customerId: currentUserId(),
  })
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
}