import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import { TbArrowBigUpFilled } from 'react-icons/tb';

import { Card as HorzCardComponent } from './components/CardHorizontal';
import { Card as VertCardComponent } from './components/CardVertical';
import { TimePill, NoTime, DropArrow } from './components/TimePill';
import { ReactComponent as Dark } from '../../public/syathen_dark.svg';

import styled from 'styled-components/macro';
import { media } from 'styles/media';

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
  if (people[0].employee_id !== '1') {
    people.unshift({
      employee_id: '1',
      first_name: 'Any',
      image_id: '/syathen_light.jpeg',
      services: ['1', '2', '3'],
      meta: {
        is_active: true,
      },
    });
  }
  return people.map((person: any) => {
    if (!person.meta.is_active) {
      return null;
    }
    getImage('people/portraits', `${person.image_id}`)
      .then(res => {
        if (res) {
          (document.getElementById(person.employee_id) as any).src = res;
        }
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
        <img
          src="/syathen_dark.jpeg"
          alt={person.first_name}
          id={person.employee_id}
        />
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
    // getImage('services/serviceImages', service.image_id)
    //   .then(res => {
    //     service.image = res;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
  timesSelection: any,
  orderDetails: any,
  dateSelection: any,
  collapsed: boolean,
  setCollapsed: any,
) => {
  if (!times) {
    return (
      <NoTime className="info">
        <h1 className="name">Pick a date.</h1>
      </NoTime>
    );
  }
  if (times.length === 0) {
    return (
      <NoTime className="info">
        <h1 className="name">No availabiltiy for this date.</h1>
      </NoTime>
    );
  }
  if (collapsed) {
    return times.map((time: any) => {
      return (
        <TimePill
          key={time}
          id={`${dateSelection}-${time}`}
          className="time"
          onClick={(e: any) => {
            Array.from(document.getElementsByClassName('time')).forEach(el => {
              el.classList.remove('timeSelected');
            });
            (
              document.getElementById(`${dateSelection}-${time}`) as any
            ).classList.add('timeSelected');
            setTimeSelection(time);
            orderDetails.time = time;
          }}
        >
          <div className="info">
            <h1 className="name">
              {dayjs(`${dateSelection} ${time}`).format('h:mm A')}
            </h1>
          </div>
        </TimePill>
      );
    });
  } else {
    if (!timesSelection) {
      return (
        <NoTime
          className="time"
          onClick={() => {
            setCollapsed(true);
          }}
        >
          <div className="info">
            <h1 className="name">Pick a time.</h1>
          </div>
        </NoTime>
      );
    }
  }
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
