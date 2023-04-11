import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import axios from 'axios';

import { BookingModel } from 'utils/model';
import { NotFoundPage } from '../NotFoundPage/Loadable';

import { Title } from './components/Title';
import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField } from './components/Form';
import { MapLocations, MapPeople, MapServices, MapTimes } from './utils';
import { scheduleBooking, getCompanyAlias, getImage } from 'utils/bookingUtils';

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
  location: { location_id: '', currency_symbol: '$' },
  professional: null,
  service: null,
  date: null,
  time: null,
  customer: {
    name: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    customer_id: null,
    address: null,
    is_user: null,
    member_id: null,
    member_type: null,
    member_status: null,
  },
  payment: null,
};

async function getLocations(companyId: string) {
  const response = await axios.get(
    `https://api.syathen.com/locations/${companyId}/`,
  );
  const data = await response.data;
  return data;
}

async function getPeople(locationId: string) {
  const response = await axios.get(
    `https://api.syathen.com/employees/${locationId}/`,
  );
  const data = await response.data;
  return data;
}

async function getService(service: string) {
  const response = await axios.get(
    `https://api.syathen.com/service/${service}/`,
  );
  const data = await response.data;
  return data;
}

export default function Booking(): JSX.Element {
  // get slug/handle from url
  const { handle } = useParams<{ handle: string }>();

  const notFound = React.useRef<boolean>(false);

  const [companyId, setCompanyId] = React.useState<any>(null);
  const [locationList, setLocationList] = React.useState<any>(null);
  const [peopleList, setPeopleList] = React.useState<any>(null);
  const [serviceList, setServiceList] = React.useState<any>(null);

  const [locationSelection, setLocationSelection] = React.useState<any>(null);
  const [personSelection, setPersonSelection] = React.useState<any>(null);
  const [serviceSelection, setServiceSelection] = React.useState<any>(null);
  const [dateSelection, setDateSelection] = React.useState<any>(null);
  const [timeSelection, setTimeSelection] = React.useState<any>(null);
  const [customerSelection, setCustomerSelection] = React.useState<any>({});
  const [emailSelection, setEmailSelection] = React.useState<any>(null);

  const { t } = useTranslation();

  const setLocation = React.useCallback(
    (location: any) => {
      setLocationSelection(location);
      orderDetails.location = location;
    },
    [setLocationSelection],
  );

  const setPerson = React.useCallback(
    (person: any) => {
      setPersonSelection(person);
      orderDetails.professional = person;
    },
    [setPersonSelection],
  );

  React.useEffect(() => {
    if (!companyId) {
      if (handle) {
        getCompanyAlias(handle)
          .then(compId => {
            if (compId) {
              setCompanyId(compId);
              notFound.current = false;
            } else {
              console.log('No company found for %s', handle);
              notFound.current = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    if (companyId && !locationSelection && !locationList) {
      getLocations(companyId).then(res => {
        if (res) {
          if (res.length === 1) {
            setLocationSelection(res[0]);
            setLocationList(res);
          } else {
            setLocationList(res);
          }
        }
      });
    }
    if (companyId && locationSelection && !personSelection && !peopleList) {
      getPeople(locationSelection.location_id)
        .then(pplres => {
          if (pplres) {
            if (pplres.length === 1) {
              setPersonSelection(pplres[0]);
              setPeopleList(pplres);
            } else {
              setPeopleList(pplres);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (
      companyId &&
      locationSelection &&
      personSelection &&
      !serviceSelection &&
      !serviceList
    ) {
      if (!serviceList) {
        if (personSelection.services.length === 1) {
          getService(personSelection.services[0])
            .then(servres => {
              if (servres) {
                setServiceSelection(servres);
                setServiceList(servres);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setServiceList([]);
          personSelection.services.forEach((service: any) => {
            getService(service)
              .then(servres => {
                if (servres) {
                  setServiceList(serviceList => [...serviceList, servres]);
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      }
    }
  }, [
    companyId,
    handle,
    locationList,
    locationSelection,
    peopleList,
    personSelection,
    serviceList,
    serviceSelection,
  ]);

  if (!notFound.current) {
    return (
      <>
        <Helmet titleTemplate={'%s - ' + handle}>
          {/* <title>{t(messages.privacyPolicy())}</title> */}
          <title>Book</title>
          <meta name="description" content="Book your appointment" />
        </Helmet>

        {notFound.current && <NotFoundPage />}

        {companyId && locationList && !locationSelection && (
          <Stage>
            <Title>Where are you looking for?</Title>
            {MapLocations(locationList, setLocation, orderDetails)}
          </Stage>
        )}

        {companyId && locationSelection && peopleList && !personSelection && (
          <Stage>
            <Title>Who are you looking for?</Title>
            {MapPeople(peopleList, setPerson, orderDetails)}
          </Stage>
        )}

        {companyId && personSelection && serviceList && !serviceSelection && (
          <Stage>
            <Title>What are you looking for?</Title>
            {MapServices(serviceList, setServiceSelection, orderDetails)}
          </Stage>
        )}

        {companyId && locationSelection && personSelection && serviceSelection && (
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
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={e => {
                    customerSelection.name = e.target.value;
                    setCustomerSelection(customerSelection);
                  }}
                />
              </FormField>
              <FormField>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={e => setEmailSelection(e.target.value)}
                />
              </FormField>
            </Form>
            <input
              type="submit"
              value="Book"
              onClick={() => {
                scheduleBooking(
                  companyId,
                  locationSelection,
                  personSelection,
                  serviceSelection,
                  customerSelection,
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
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}
