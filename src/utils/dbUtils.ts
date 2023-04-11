import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
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

export async function getCompanyDetails(ulid) {
  if (ulid) {
    ulid = currentUserId();
  }
  if (typeof ulid === 'string' && ulid.length > 0) {
    const docRef = doc(db, 'companyProfile', ulid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  return null;
}

export async function updateCompany(companyId: string, data: any) {
  await updateDoc(doc(db, 'companyProfile', companyId), {
    ...data,
  });
}

// export async function newEmployee(
//   companyId: string,
//   firstName: string,
//   lastName: string,
//   intials: string,
//   email: string,
//   phone: string,
//   extra: any,
// ) {
//   const ulid = UlidMonotonic.generate();
//   await setDoc(doc(db, 'employeeProfile', ulid.toRaw()), {
//     firstName: firstName,
//     lastName: lastName,
//     initials: intials,
//     email: email,
//     phone: phone,
//     employeeId: ulid.toRaw(),
//     billId: '',
//     active: true,
//     imageId: '',
//     createDate: Date.now(),
//     updateDate: Date.now(),
//     services: [],
//     locations: [],
//     schedules: [],
//     companyId: companyId,
//     ...extra,
//   })
//     .then(() => {})
//     .catch(e => {
//       console.log(e);
//     });
//   await updateDoc(doc(db, 'companyProfile', companyId), {
//     employees: arrayUnion(ulid.toRaw()),
//   });
//   await updateDoc(doc(db, 'locationProfile', companyId), {
//     employees: arrayUnion(ulid.toRaw()),
//   });
// }
//
// export async function getEmployeeDetails(ulid) {
//   if (typeof ulid === 'string' && ulid.length > 0) {
//     const docRef = doc(db, 'employeeProfile', ulid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       return docSnap.data();
//     }
//   }
//   return null;
// }

// export async function updateEmployee(employeeId: string, data: any) {
//   await updateDoc(doc(db, 'employeeProfile', employeeId), {
//     ...data,
//   });
// }

// export async function removeEmployee(employeeId: string, companyId: string) {
//   await updateDoc(doc(db, 'companyProfile', companyId), {
//     employees: arrayRemove(employeeId),
//   });
//   await updateDoc(doc(db, 'employeeProfile', employeeId), {
//     active: false,
//   });
// }

export async function newLocation(
  companyId: string,
  name: string,
  address: string,
  extra: any,
) {
  const ulid = UlidMonotonic.generate();
  await setDoc(doc(db, 'locationProfile', ulid.toRaw()), {
    name: name,
    address: address,
    locationId: ulid.toRaw(),
    billId: '',
    active: true,
    imageId: '',
    createDate: Date.now(),
    updateDate: Date.now(),
    employees: [],
    services: [],
    schedules: [],
    companyId: companyId,
    ...extra,
  })
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
  await updateDoc(doc(db, 'companyProfile', companyId), {
    locations: arrayUnion(ulid.toRaw()),
  });
}

export async function updateLocation(locationId: string, data: any) {
  await updateDoc(doc(db, 'locationProfile', locationId), {
    ...data,
  });
}

export async function removeLocation(locationId: string, companyId: string) {
  await updateDoc(doc(db, 'companyProfile', companyId), {
    locations: arrayRemove(locationId),
  });
  await updateDoc(doc(db, 'locationProfile', locationId), {
    active: false,
  });
}

export async function newService(
  companyId: string,
  name: string,
  description: string,
  imageId: string,
  extra: any,
) {
  const ulid = UlidMonotonic.generate();
  await setDoc(doc(db, 'serviceProfile', ulid.toRaw()), {
    name: name,
    description: description,
    serviceId: ulid.toRaw(),
    billId: '',
    active: true,
    imageId: imageId,
    createDate: Date.now(),
    updateDate: Date.now(),
    companyId: companyId,
    ...extra,
  })
    .then(() => {})
    .catch(e => {
      console.log(e);
    });
  await updateDoc(doc(db, 'companyProfile', companyId), {
    services: arrayUnion(ulid.toRaw()),
  });
}

export async function getServiceDetails(ulid) {
  if (typeof ulid === 'string' && ulid.length > 0) {
    const docRef = doc(db, 'serviceProfile', ulid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  return null;
}

export async function updateService(serviceId: string, data: any) {
  await updateDoc(doc(db, 'serviceProfile', serviceId), {
    ...data,
  });
}

export async function removeService(serviceId: string, companyId: string) {
  await updateDoc(doc(db, 'companyProfile', companyId), {
    services: arrayRemove(serviceId),
  });
  await updateDoc(doc(db, 'serviceProfile', serviceId), {
    active: false,
  });
}

// export async function removeServiceFromEmployees(
//   serviceId: string,
//   companyId: string,
// ) {
//   const company = await getCompanyDetails(companyId);
//   if (company && company.employees) {
//     for (let i = 0; i < company.employees.length; i++) {
//       const employee = await getEmployeeDetails(company.employees[i]);
//       if (employee && employee.services) {
//         for (let j = 0; j < employee.services.length; j++) {
//           if (employee.services[j] === serviceId) {
//             await updateDoc(doc(db, 'employeeProfile', employee.employeeId), {
//               services: arrayRemove(serviceId),
//             });
//           }
//         }
//       }
//     }
//   }
// }
