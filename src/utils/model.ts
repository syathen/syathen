import { FirestoreErrorCode } from 'firebase/firestore';

export type ErrorType = {
  code: FirestoreErrorCode;
  message: string;
  name: string;
  stack?: string;
};

interface meta {
  create_date: string;
  update_date: string;
  is_active: boolean | true;
  booking_type?: string;
}

interface extra {
  [key: string]: any;
}

export type AddressType = {
  street_first: string;
  street_second?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type BookingModel = {
  booking_id: string;
  company_id: string;
  meta: meta;
  customer: {
    name: string;
    first_name: string | null;
    last_name: string | null;
    customer_id: string | null;
    email: string | null;
    phone: string | null;
    address: AddressType | null;
    is_user: boolean;
    member_id: string | null;
    member_type: string | null;
    member_status: string | null;
  };
  details: {
    date: Date;
    time: Date;
    message: string | null;
    extra: extra;
    service: {
      service_id: string;
      service_name: string;
      service_price: number;
      service_duration: number;
      service_image: string | null;
      request: string;
      extra: extra;
    };
    location: {
      location_id: string;
      location_name: string;
      location_address: AddressType | null;
      location_phone: string | null;
      location_email: string | null;
      location_image: string | null;
      location_extra: extra;
    };
    employee: {
      employee_id: string;
      employee_name: string;
      employee_first_name: string | null;
      employee_last_name: string | null;
      employee_image: string | null;
      employee_extra: extra;
    };
  };
};

export type CompanyModel = {
  company_id: string;
  name: string;
  address: AddressType | null;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
  private: {
    owner_id: string;
    bill_id?: string | null;
    bill_type?: string | null;
    bill_status?: string | null;
    bill_extra?: extra;
  };
  meta: meta;
  extra: extra;
};

export type EmployeeModel = {
  employee_id: string;
  company_id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  account: {
    is_active: boolean;
    is_verified: boolean;
    is_admin: boolean;
    is_owner: boolean;
    is_manager: boolean;
    is_employee: boolean;
  };
  meta: meta;
  extra: extra;
};

export type LocationModel = {
  location_id: string;
  company_id: string;
  name: string;
  address: AddressType | null;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
  services: string[];
  employees: string[];
  meta: meta;
  extra: extra;
};

export type ServiceModel = {
  service_id: string;
  company_id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  image: string | null;
  request: string;
  meta: meta;
  extra: extra;
};

export type UserModel = {
  uid: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string | null;
  phone: string | null;
  account: {
    type: string;
    status: string;
    employee_id: string | null;
  };
  meta: meta;
  extra: extra;
};
