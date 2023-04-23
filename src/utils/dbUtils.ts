import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import dayjs from 'dayjs';
import { UlidMonotonic } from 'id128';

import {
  CompanyModel,
  EmployeeModel,
  LocationModel,
  ServiceModel,
  UserModel,
  ErrorType,
  AddressType,
} from './model';

import { db, currentUserId } from './firebase-init';

export async function emptyCompany(
  name: string,
  email: string,
  user_id: string,
): Promise<CompanyModel | ErrorType> {
  const ulid = UlidMonotonic.generate().toRaw();

  const company: CompanyModel = {
    company_id: ulid,
    name: name,
    address: null,
    phone: null,
    email: email,
    image: null,
    private: {
      owner_id: user_id,
    },
    meta: {
      create_date: dayjs().format(),
      update_date: dayjs().format(),
      is_active: true,
    },
    extra: {},
  };
  await setDoc(doc(db, 'companyProfile', ulid), company)
    .then(() => {
      return company;
    })
    .catch((e: ErrorType) => {
      return e;
    });
  return {
    code: 'unknown' as ErrorType['code'],
    message: 'No response from server, company not created',
    name: 'Failed to create company',
  } as ErrorType;
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

export async function newEmployee(
  company_id: string,
  first_name: string,
  last_name?: string | null,
  email?: string,
  phone?: string,
  image?: string,
  is_admin?: boolean,
  is_owner?: boolean,
  is_manager?: boolean,
  is_employee?: boolean,
  extra?: any,
): Promise<EmployeeModel | ErrorType> {
  const ulid = UlidMonotonic.generate().toRaw();

  const employee: EmployeeModel = {
    employee_id: ulid,
    company_id: company_id,
    name: (last_name ? first_name + ' ' + last_name : first_name).trim(),
    first_name: first_name,
    last_name: last_name || null,
    email: email || null,
    phone: phone || null,
    image: image || null,
    account: {
      is_active: true,
      is_verified: false,
      is_admin: is_admin || false,
      is_owner: is_owner || false,
      is_manager: is_manager || false,
      is_employee: is_employee || false,
    },
    meta: {
      create_date: dayjs().format(),
      update_date: dayjs().format(),
      is_active: true,
    },
    extra: extra,
  };

  await setDoc(doc(db, 'employeeProfile', ulid), employee)
    .then(() => {
      updateDoc(doc(db, 'companyProfile', company_id), {
        employees: arrayUnion(ulid),
      });
      updateDoc(doc(db, 'locationProfile', company_id), {
        employees: arrayUnion(ulid),
      });
    })
    .catch((e: ErrorType) => {
      return e;
    });

  return {
    code: 'unknown' as ErrorType['code'],
    message: 'No response from server, employee not created',
    name: 'Failed to create employee',
  } as ErrorType;
}

export async function getEmployeeDetails(
  ulid: string,
): Promise<EmployeeModel | null> {
  if (typeof ulid === 'string' && ulid.length > 0) {
    const docRef = doc(db, 'employeeProfile', ulid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as EmployeeModel;
    }
  }
  return null;
}

export async function updateEmployee(employeeId: string, data: any) {
  await updateDoc(doc(db, 'employeeProfile', employeeId), {
    ...data,
  });
}

export async function removeEmployee(employeeId: string, companyId: string) {
  await updateDoc(doc(db, 'companyProfile', companyId), {
    employees: arrayRemove(employeeId),
  });
  await updateDoc(doc(db, 'employeeProfile', employeeId), {
    active: false,
  });
}

export async function newLocation(
  company_id: string,
  name: string,
  address: AddressType,
  email?: string,
  phone?: string,
  image?: string,
  extra?: any,
): Promise<LocationModel | ErrorType> {
  const ulid = UlidMonotonic.generate().toRaw();

  const location: LocationModel = {
    location_id: ulid,
    company_id: company_id,
    name: name,
    address: address,
    phone: phone,
    email: email,
    image: image,
    employees: [],
    services: [],
    meta: {
      is_active: true,
      create_date: dayjs().format(),
      update_date: dayjs().format(),
    },
    extra: extra,
  };
  await setDoc(doc(db, 'locationProfile', ulid), location)
    .then(() => {
      updateDoc(doc(db, 'companyProfile', company_id), {
        locations: arrayUnion(ulid),
      }).then(() => {
        return location;
      });
    })
    .catch((e: ErrorType) => {
      return e;
    });
  return {
    code: 'unknown' as ErrorType['code'],
    message: 'No response from server, location not created',
    name: 'Failed to create location',
  } as ErrorType;
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
  company_id: string,
  name: string,
  description: string,
  image_id: string,
  price?: number,
  is_active?: boolean,
  extra?: any,
): Promise<ServiceModel | ErrorType> {
  const ulid = UlidMonotonic.generate().toRaw();

  const service: ServiceModel = {
    service_id: ulid,
    company_id: company_id,
    name: name,
    description: description,
    price: price || 0,
    image_id: image_id,
    meta: {
      createDate: dayjs().format(),
      updateDate: dayjs().format(),
      is_active: is_active || true,
      booking_type: 'appointment',
    },
    ...extra,
  };
  await setDoc(doc(db, 'serviceProfile', ulid), service)
    .then(() => {
      updateDoc(doc(db, 'companyProfile', company_id), {
        services: arrayUnion(ulid),
      }).then(() => {
        return service;
      });
    })
    .catch((e: ErrorType) => {
      return e;
    });
  return {
    code: 'unknown' as ErrorType['code'],
    message: 'No response from server, service not created',
    name: 'Failed to create service',
  } as ErrorType;
}

export async function getServiceDetails(
  ulid: string,
): Promise<ServiceModel | null> {
  if (ulid.length > 0) {
    const docRef = doc(db, 'serviceProfile', ulid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ServiceModel;
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
  })
    .then(() => {
      updateDoc(doc(db, 'serviceProfile', serviceId), {
        active: false,
      });
    })
    .catch((e: ErrorType) => {
      return e;
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

export async function createUser(
  uid: string,
  email: string,
  firstName: string,
  lastName?: string | null,
  phone?: string | null,
  employee_id?: string | null,
  extra?: any | null,
): Promise<UserModel | Error> {
  const ulid = UlidMonotonic.generate().toRaw();

  const user: UserModel = {
    uid: uid,
    user_id: ulid,
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    account: {
      type: 'free',
      status: 'active',
      employee_id: employee_id,
    },
    meta: {
      create_date: new Date().toUTCString(),
      update_date: new Date().toUTCString(),
      is_active: true,
    },
    ...extra,
  };

  await setDoc(doc(db, 'userProfile', ulid), user)
    .then(() => {
      return user;
    })
    .catch((e: ErrorType) => {
      return e;
    });
  return {
    code: 'unknown' as ErrorType['code'],
    message: 'No response from server, user not created',
    name: 'Failed to create user',
  } as ErrorType;
}
