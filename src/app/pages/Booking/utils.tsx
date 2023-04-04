import { Card as HorzCardComponent } from './components/CardHorizontal';
import { Card as VertCardComponent } from './components/CardVertical';
import { Card as TimePill } from './components/TimePill';

export const MapLocations = (
  locations: Array<any>,
  setLocationSelection: any,
  orderDetails: any,
) => {
  return locations.map((location: any) => {
    return (
      <HorzCardComponent
        key={location.id}
        onClick={() => {
          setLocationSelection(location);
          orderDetails.location = location;
        }}
      >
        <img src={location.image} alt={location.name} />
        <div className="info">
          <h1 className="name">{location.name}</h1>
          <p className="address">{location.address}</p>
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
    return (
      <VertCardComponent
        key={person.id}
        onClick={() => {
          setPersonSelection(person);
          orderDetails.person = person;
        }}
      >
        <img src={person.image} alt={person.name} />
        <div className="info">
          <h1 className="name">{person.name}</h1>
          <p className="description">{person.description}</p>
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
    return (
      <HorzCardComponent
        key={service.id}
        onClick={() => {
          setServiceSelection(service);
          orderDetails.service = service;
        }}
      >
        {/* <img src={service.image} alt={service.name} /> */}
        <div className="info" style={{ marginLeft: '2rem' } as any}>
          <h1 className="name">{service.name}</h1>
          <p className="description">{service.description}</p>
          <p className="price">
            {orderDetails.location.currency_symbol + service.price}
          </p>
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