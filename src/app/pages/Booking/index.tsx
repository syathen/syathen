import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Title } from './components/Title';
import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField } from './components/Form';
import { MapLocations, MapPeople, MapServices, MapTimes } from './utils';
import { scheduleBooking } from 'utils/bookingUtils';

import { LocationList, ServiceList, PeopleList } from './testData';

// 1st Screen with locations (skipped if only one location)
// 2nd Screen with Professionals (skipped if only one professional)
// 3rd Screen with Services (skipped if only one service)
// 4th Screen with Date and Time
// 5th Screen with Customer Details (name, email, phone) (skipped if not configured)
// 6th Screen with Payment Details (card details, paypal, etc) (skipped if not configured)
// 7th Screen with Confirmation

const TimeList = {
  time: [
    {
      id: 1,
      time: '9:00 AM',
    },
    {
      id: 2,
      time: '9:30 AM',
    },
    {
      id: 3,
      time: '10:00 AM',
    },
    {
      id: 4,
      time: '10:30 AM',
    },
    {
      id: 5,
      time: '11:00 AM',
    },
    {
      id: 6,
      time: '11:30 AM',
    },
    {
      id: 7,
      time: '12:00 PM',
    },
    {
      id: 8,
      time: '12:30 PM',
    },
    {
      id: 9,
      time: '1:00 PM',
    },
    {
      id: 10,
      time: '1:30 PM',
    },
    {
      id: 11,
      time: '2:00 PM',
    },
    {
      id: 12,
      time: '2:30 PM',
    },
    {
      id: 13,
      time: '3:00 PM',
    },
    {
      id: 14,
      time: '3:30 PM',
    },
    {
      id: 15,
      time: '4:00 PM',
    },
    {
      id: 16,
      time: '4:30 PM',
    },
  ],
};

let orderDetails = {
  location: { currency_symbol: '$' },
  professional: null,
  service: null,
  date: null,
  time: null,
  customer: null,
  payment: null,
};

export default function Booking(): JSX.Element {
  const [locationSelection, setLocationSelection] = React.useState<any>(null);
  const [personSelection, setPersonSelection] = React.useState<any>(null);
  const [serviceSelection, setServiceSelection] = React.useState<any>(null);
  const [dateSelection, setDateSelection] = React.useState<any>(null);
  const [timeSelection, setTimeSelection] = React.useState<any>(null);

  return (
    <>
      <Helmet titleTemplate="%s - brand">
        <title>Book</title>
        <meta name="description" content="Book your appointment" />
      </Helmet>

      {LocationList.location.length > 1 && locationSelection === null && (
        <Stage>
          {/* <Title>Pick a Spot!</Title> */}
          <Title>Where are you looking for?</Title>
          {MapLocations(
            LocationList.location,
            setLocationSelection,
            orderDetails,
          )}
        </Stage>
      )}

      {LocationList.location.length <= 1 && locationSelection === null
        ? setLocationSelection(LocationList.location[0])
        : null}

      {locationSelection != null &&
        PeopleList.people.length > 1 &&
        personSelection === null && (
          <Stage>
            {/* <Title>Pick a Person!</Title> */}
            <Title>Who are you looking for?</Title>
            {MapPeople(PeopleList.people, setPersonSelection, orderDetails)}
          </Stage>
        )}

      {PeopleList.people.length <= 1 && personSelection === null
        ? setPersonSelection(PeopleList.people[0])
        : null}

      {ServiceList.services.length > 1 &&
        personSelection != null &&
        serviceSelection === null && (
          <Stage>
            {/* <Title>Pick a Service!</Title> */}
            <Title>What are you looking for?</Title>
            {MapServices(
              ServiceList.services,
              setServiceSelection,
              orderDetails,
            )}
          </Stage>
        )}

      {ServiceList.services.length <= 1 && serviceSelection === null
        ? setServiceSelection(ServiceList.services[0])
        : null}

      {serviceSelection != null && (
        <Stage>
          <Title>Book your appointment</Title>
          <Form>
            <FormField>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={e => setDateSelection(e.target.value)}
              />
            </FormField>
            <FormField>
              <label htmlFor="time">Time</label>
              <input type="time" name="time" id="time" />
            </FormField>
            <FormField>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </FormField>
            <FormField>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </FormField>
          </Form>
          <input
            type="submit"
            value="Book"
            onClick={() => {
              scheduleBooking(
                '01873A27BB2F364353D41C93B1mmm086378',
                locationSelection.id,
                personSelection.id,
                serviceSelection.id,
                dateSelection,
                timeSelection,
              );
            }}
          />
          <StageCenter>
            {MapTimes(TimeList.time, setTimeSelection, orderDetails)}
          </StageCenter>
        </Stage>
      )}

      {console.log(
        locationSelection,
        personSelection,
        serviceSelection,
        orderDetails,
      )}
    </>
  );
}
