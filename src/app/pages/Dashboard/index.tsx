import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Title } from './components/Title';
import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField } from './components/Form';
import { DayView, Appointments, Header } from './components/DayView';
import { MapAppointments } from './utils';
import { getBookingsByLocation } from 'utils/bookingUtils';

const testbookings = [
  {
    id: '1',
    firstName: 'Jimothy',
    lastName: 'Timothy',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '10:00',
  },
  {
    id: '2',
    firstName: 'Carl',
    lastName: 'Trims',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '11:15',
  },
  {
    id: '3',
    firstName: 'Randy',
    lastName: 'Jackson',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '12:00',
  },
  {
    id: '4',
    firstName: 'Eddie',
    lastName: 'Vedder',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '13:00',
  },
  {
    id: '5',
    firstName: 'Mick',
    lastName: 'Jagger',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '14:00',
  },
  {
    id: '6',
    firstName: 'Johnny',
    lastName: 'Cash',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '15:00',
  },
  {
    id: '7',
    firstName: 'Bob',
    lastName: 'Dylan',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '12:10',
  },
  {
    id: '8',
    firstName: 'Bruce',
    lastName: 'Springsteen',
    service: 'Haircut',
    location: "Jim's Trims",
    date: '2021-01-01',
    time: '17:00',
  },
];

export default function Dashboard(): JSX.Element {
  const [timeFormat, setTimeFormat] = React.useState<string>('12');
  const [nameFormat, setNameFormat] = React.useState<string>('asc');
  const [timeSort, setTimeSort] = React.useState<string>('asc');

  const swapSort = (state: any, setState: any) => {
    if (state === 'asc') {
      setState('desc');
    } else {
      setState('asc');
    }
  };

  const [bookings, setBookings] = React.useState<any>(null);

  React.useEffect(() => {
    const getBookings = async () => {
      const data = await getBookingsByLocation('7NyADXL4tRCE6dJYfaMZ');
      setBookings(data);
    };
    getBookings();
  }, []);

  return (
    <>
      <Helmet titleTemplate="%s - brand">
        <title>Dashboard</title>
        <meta name="description" content="View your buisness dashboard." />
      </Helmet>
      <Stage>
        <DayView title="Today">
          <Header>
            <tbody>
              <tr>
                <th
                  title="Time"
                  onClick={() => swapSort(timeSort, setTimeSort)}
                >
                  Time
                </th>
                <th
                  title="Name"
                  onClick={() => swapSort(nameFormat, setNameFormat)}
                >
                  Name
                </th>
                <th title="Services">Services</th>
              </tr>
            </tbody>
          </Header>
          <hr />
          <Appointments>
            {bookings &&
              MapAppointments(
                bookings.sort((a, b) => {
                  if (timeSort === 'asc') {
                    console.log(a.details);
                    return a.details.time.time.localeCompare(b.time);
                  } else {
                    return b.details.time.time.localeCompare(a.time);
                  }
                }),
                timeFormat,
                nameFormat,
              )}
          </Appointments>
        </DayView>
      </Stage>
    </>
  );
}
