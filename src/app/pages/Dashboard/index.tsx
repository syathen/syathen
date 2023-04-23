import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField } from './components/Form';
import { DayView, Appointments, Header } from './components/DayView';
import { Book } from './components/Schedule';
import { MapAppointments } from './utils';
import { getBookingsByLocation, getCompanyAlias } from 'utils/bookingUtils';

import { NavBar } from './components/NavBar';

import { auth } from 'utils/firebase-init';

async function getLocations(companyId: string) {
  const response = await axios.get(
    `https://api.syathen.com/locations/${companyId}/`,
  );
  const data = await response.data;
  return data;
}

function findClosestAppointment(appointments, targetDateString, setJumpTo) {
  let closestDate: Date | null = null;
  let closestDiff = Infinity;
  const targetDate = moment(targetDateString);

  appointments.map((appointment: any) => {
    const appointmentDate = moment(appointment.details.date);
    const diff = appointmentDate.diff(targetDate);

    if (diff < closestDiff && diff > 0) {
      closestDate = appointmentDate.toDate();
      closestDiff = diff;
    }
  });
  setJumpTo(moment(closestDate).format('YYYY-MM-DD'));
  return moment(closestDate).format('YYYY-MM-DD');
}

export default function Dashboard(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  const history = useNavigate();

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (!user) {
  //       setLoggedIn(false);
  //     } else {
  //       setLoggedIn(true);
  //     }
  //   });
  // }, [history]);

  const [companyId, setCompanyId] = React.useState<string>('');

  const [timeFormat, setTimeFormat] = React.useState<string>('12');
  const [nameFormat, setNameFormat] = React.useState<string>('asc');
  const [timeSort, setTimeSort] = React.useState<string>('asc');

  const loading = React.useRef<boolean>(false);

  const [locations, setLocations] = React.useState<any>(null);
  const [location, setLocation] = React.useState<string>('');

  const locationCallback = (e: any) => {
    if (location !== e) {
      setBookings(null);
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
  const [jumpTo, setJumpTo] = React.useState<string>('');

  // terrible use of useEffect, but it "works"
  React.useEffect(() => {
    if (slug) {
      getCompanyAlias(slug)
        .then(compId => {
          if (compId) {
            setCompanyId(compId);
            if (!locations && !loading.current) {
              loading.current = true;
              getLocations(compId)
                .then(data => {
                  if (data) {
                    setLocations(data);
                    setLocation(data[0].location_id);
                  }
                  loading.current = false;
                })
                .catch(err => {
                  console.log(err);
                });
            }
          } else {
            console.log('No company found for %s', slug);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    const getBookings = async () => {
      const data = await getBookingsByLocation(location);
      setBookings(data);
    };

    if (location && !bookings) {
      getBookings();
    }
    if (bookings) {
      const target = document.getElementById(
        findClosestAppointment(bookings, new Date(), setJumpTo),
      );
      target && target.scrollIntoView();
    }
  }, [bookings, companyId, jumpTo, location, locations, slug]);

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
          <Appointments id="appointments">
            {bookings &&
              MapAppointments(
                bookings
                  .sort((a, b) => {
                    const atime = a.details.time.time
                      ? a.details.time.time
                      : a.details.time;
                    const btime = b.details.time.time
                      ? b.details.time.time
                      : b.details.time;
                    return atime.localeCompare(btime);
                  })
                  .sort((a, b) => {
                    if (timeSort === 'asc') {
                      return a.details.date.localeCompare(b.details.date);
                    } else {
                      return b.details.date.localeCompare(a.details.date);
                    }
                  }),
                timeFormat,
                nameFormat,
              )}
          </Appointments>
        </DayView>

        {slug && <Book key={location} {...{ slug, location, locations }} />}
      </Stage>
    </>
  );
}
