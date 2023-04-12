import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Title } from './components/Title';
import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField } from './components/Form';
import { DayView, Appointments, Header } from './components/DayView';
import { MapAppointments } from './utils';
import { getBookingsByLocation } from 'utils/bookingUtils';

import { NavBar } from './components/NavBar';

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

async function getLocations(companyId: string) {
  const response = await axios.get(
    `https://api.syathen.com/locations/${companyId}/`,
  );
  const data = await response.data;
  return data;
}

export default function Dashboard(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  const [timeFormat, setTimeFormat] = React.useState<string>('12');
  const [nameFormat, setNameFormat] = React.useState<string>('asc');
  const [timeSort, setTimeSort] = React.useState<string>('asc');

  const loading = React.useRef<boolean>(false);

  const [locations, setLocations] = React.useState<any>(null);
  const [location, setLocation] = React.useState<string>('');

  const locationCallback = (e: any) => {
    if (location !== e) {
      setLocation(e);
    }
  };

  const swapSort = (state: any, setState: any) => {
    if (state === 'asc') {
      setState('desc');
    } else {
      setState('asc');
    }
  };

  const [bookings, setBookings] = React.useState<any>(null);

  React.useEffect(() => {
    if (slug) {
      if (!locations && !loading.current) {
        loading.current = true;
        getLocations(slug).then(data => {
          if (data) {
            setLocations(data);
            setLocation(data[0].location_id);
          }
          loading.current = false;
        });
      }
    }
    const getBookings = async () => {
      const data = await getBookingsByLocation(location);
      setBookings(data);
    };
    if (location) {
      getBookings();
    }
  }, [location, locations, slug]);

  return (
    <>
      <Helmet titleTemplate="%s - brand">
        <title>Dashboard</title>
        <meta name="description" content="View your buisness dashboard." />
      </Helmet>
      <NavBar {...{ location, locations, locationCallback }} />
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
