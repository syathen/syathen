export type BookingModel = {
  booking_id: string;
  company_id: string;
  meta: {
    create_date: string;
    update_date: string;
    status: string;
    booking_type: string | null;
  };
  customer: {
    name: string;
    first_name: string | null;
    last_name: string | null;
    customer_id: string | null;
    email: string | null;
    phone: string | null;
    address: {
      street_first: string;
      street_second: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    } | null;
    is_user: boolean;
    member_id: string | null;
    member_type: string | null;
    member_status: string | null;
  };
  details: {
    date: Date;
    time: Date;
    message: string | null;
    extra: any;
    service: {
      service_id: string;
      service_name: string;
      service_price: number;
      service_duration: number;
      service_image: string | null;
      request: string;
      extra: any;
    };
    location: {
      location_id: string;
      location_name: string;
      location_address: string | null;
      location_phone: string | null;
      location_email: string | null;
      location_image: string | null;
      location_extra: any | null;
    };
    employee: {
      employee_id: string;
      employee_name: string;
      employee_first_name: string | null;
      employee_last_name: string | null;
      employee_image: string | null;
      employee_extra: any | null;
    };
  };
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
  extra: any | null;
  account: {
    is_active: boolean;
    is_verified: boolean;
    is_admin: boolean;
    is_owner: boolean;
    is_manager: boolean;
    is_employee: boolean;
  };
  meta: {
    create_date: string;
    update_date: string;
    is_active: boolean;
  };
};

export type LocationModel = {
  location_id: string;
  company_id: string;
  name: string;
  address: {
    street_first: string;
    street_second: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } | null;
  phone: string | null;
  email: string | null;
  image: string | null;
  extra: any | null;
  meta: {
    create_date: string;
    update_date: string;
    is_active: boolean;
  };
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
  extra: any;
  meta: {
    create_date: string;
    update_date: string;
    is_active: boolean;
  };
};

export type UserModel = {
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
  meta: {
    create_date: string;
    update_date: string;
    is_active: boolean;
  };
  extra: any | null;
};
