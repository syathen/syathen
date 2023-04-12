import { Card as HorzCardComponent } from './components/CardHorizontal';
import { Card as VertCardComponent } from './components/CardVertical';
import { Card as TimePill } from './components/TimePill';
import { ReactComponent as Dark } from '../../public/syathen_dark.svg';

import { getImage } from 'utils/bookingUtils';

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const MapLocations = (
  locations: Array<any>,
  setLocationSelection: any,
  orderDetails: any,
) => {
  return locations.map((location: any) => {
    if (!location.is_active) {
      return null;
    }
    location.image_id = '/syathen_dark.jpeg';
    getImage('services/serviceImages', location.image_id)
      .then(res => {
        location.image_id = res;
      })
      .catch(err => {});
    return (
      <HorzCardComponent
        key={location.location_id}
        onClick={() => {
          setLocationSelection(location);
          orderDetails.location = location;
        }}
      >
        <img src={location.image_id} alt={location.name} />
        <div className="info">
          <h1 className="name">{location.name}</h1>
          <p className="address">{location.street}</p>
          <p className="city">{location.city + ', ' + location.state}</p>
        </div>
      </HorzCardComponent>
    );
  });
};

export const MapPeople = (
  people: Array<any>,
  setPersonSelection: any,
  orderDetails: any,
) => {
  return people.map((person: any) => {
    if (!person.is_active) {
      return null;
    }
    person.image_id = '/syathen_dark.jpeg';
    getImage('services/serviceImages', person.image_id)
      .then(res => {
        person.image_id = res;
      })
      .catch(err => {
        console.log(err);
      });
    return (
      <VertCardComponent
        key={person.employee_id}
        onClick={() => {
          setPersonSelection(person);
          orderDetails.person = person;
        }}
      >
        <img src={person.image_id} alt={person.first_name} />
        <div className="info">
          <h1 className="name">
            {person.first_name} {person.last_name}
          </h1>
          {/* <p className="description">{person.description}</p> */}
        </div>
      </VertCardComponent>
    );
  });
};

export const MapServices = (
  services: Array<any>,
  setServiceSelection: any,
  orderDetails: any,
) => {
  return services.map((service: any) => {
    if (!service.is_active) {
      return null;
    }
    service.image_id = '/syathen_dark.jpeg';
    getImage('services/serviceImages', service.image_id)
      .then(res => {
        service.image = res;
      })
      .catch(err => {
        console.log(err);
      });
    return (
      <HorzCardComponent
        key={service.serviceId}
        onClick={() => {
          setServiceSelection(service);
          orderDetails.service = service;
        }}
      >
        {/* <img src={service.image} alt={service.name} /> */}
        <div className="info" style={{ marginLeft: '2rem' } as any}>
          <h1 className="name">{service.service_name}</h1>
          <p className="description">{service.description}</p>
          <p className="price">{`${USDollar.format(service.price)}`}</p>
        </div>
      </HorzCardComponent>
    );
  });
};

export const MapTimes = (
  times: Array<any>,
  setTimeSelection: any,
  orderDetails: any,
) => {
  return times.map((time: any) => {
    return (
      <TimePill
        key={time.id}
        onClick={() => {
          setTimeSelection(time);
          orderDetails.time = time;
        }}
      >
        <div className="info">
          <h1 className="name">{time.time}</h1>
        </div>
      </TimePill>
    );
  });
};

export const mapAvailableDates = (dates: Array<any>, setDateSelection: any) => {
  return dates.map((date: any) => {
    return (
      <HorzCardComponent
        key={date.id}
        onClick={() => {
          setDateSelection(date);
        }}
      >
        <div className="info">
          <h1 className="name">{date.date}</h1>
        </div>
      </HorzCardComponent>
    );
  });
};
