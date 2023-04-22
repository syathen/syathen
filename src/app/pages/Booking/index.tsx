import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';

import { NotFoundPage } from '../NotFoundPage/Loadable';
import { DropArrow } from './components/TimePill';
import { TbArrowBigUpFilled } from 'react-icons/tb';

import { CalendarPage, CalendarContainer } from './Calendar/Calendar';
import { Title, P, HR, Bold } from './components/Title';
import { Stage } from './components/Stage';
import { StageCenter } from './components/StageCenter';
import { Form, FormField, FormButton, BackButton } from './components/Form';
import { MapLocations, MapPeople, MapServices, MapTimes } from './utils';
import {
  scheduleBooking,
  getCompanyAlias,
  generateTimeSlots,
} from 'utils/bookingUtils';
import { FormLabel, FormSubHeading } from 'app/components/FormLabel';

// 1st Screen with locations (skipped if only one location)
// 2nd Screen with Professionals (skipped if only one professional)
// 3rd Screen with Services (skipped if only one service)
// 4th Screen with Date and Time
// 5th Screen with Customer Details (name, email, phone) (skipped if not configured)
// 6th Screen with Payment Details (card details, paypal, etc) (skipped if not configured)
// 7th Screen with Confirmation

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
  const failed = React.useRef<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const [companyId, setCompanyId] = React.useState<any>(null);
  const [locationList, setLocationList] = React.useState<any>(null);
  const [peopleList, setPeopleList] = React.useState<any>(null);
  const [serviceList, setServiceList] = React.useState<any>(null);
  const [timeList, setTimeList] = React.useState<any>(null);

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

  const setDate = React.useCallback((date: any) => {
    setDateSelection(date);
    setCollapsed(false);
    setTimeSelection(null);
  }, []);

  const failureCallback = React.useCallback(
    (error: boolean, message: string) => {
      failed.current = error;
      (document.getElementById('submit') as any).disabled = false;
      (document.getElementById('submit') as any).value = 'Book';
      (document.getElementById('submit') as any).style.opacity = '1';
      if (error) {
        (document.getElementById('error') as any).style.display = 'block';
        setError(message);
      } else {
        (document.getElementById('error') as any).style.display = 'none';
        setSuccess(true);
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!companyId) {
      failed.current = false;
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
    dateSelection,
    handle,
    locationList,
    locationSelection,
    peopleList,
    personSelection,
    serviceList,
    serviceSelection,
  ]);

  React.useEffect(() => {
    if (personSelection && dateSelection) {
      generateTimeSlots(
        `${dayjs(dateSelection).format('YYYY-MM')}`,
        `${dayjs(dateSelection).format('DD')}`,
        personSelection.employee_id
          ? personSelection.employee_id
          : personSelection.id,
      ).then(res => {
        if (res) {
          setTimeList(res);
          if (res.length > 0) {
            console.log('Setting time selection');
            setCollapsed(true);
          } else {
            setCollapsed(false);
          }
        }
      });
    }
  }, [dateSelection, personSelection]);

  if (!notFound.current) {
    return (
      <>
        <Helmet titleTemplate={'%s - ' + handle}>
          {/* <title>{t(messages.privacyPolicy())}</title> */}
          <title>Book</title>
          <meta name="description" content="Book your appointment" />
        </Helmet>

        {notFound.current && <NotFoundPage />}

        {companyId && locationList && !locationSelection && !success && (
          <Stage>
            <Title>Where are you looking for?</Title>
            {MapLocations(locationList, setLocation, orderDetails)}
          </Stage>
        )}

        {companyId &&
          locationSelection &&
          peopleList &&
          !personSelection &&
          !success && (
            <>
              <Stage>
                <Title>Who are you looking for?</Title>
                {MapPeople(peopleList, setPerson, orderDetails)}
              </Stage>
              {locationList.length && locationList.length > 1 && (
                <BackButton
                  onClick={() => {
                    setLocationSelection(null);
                    setLocationList(null);
                    setPersonSelection(null);
                    setPeopleList(null);
                  }}
                >
                  {`< Back`}
                </BackButton>
              )}
            </>
          )}

        {companyId &&
          personSelection &&
          serviceList &&
          !serviceSelection &&
          !success && (
            <>
              <Stage>
                <Title>What are you looking for?</Title>
                {MapServices(serviceList, setServiceSelection, orderDetails)}
              </Stage>
              <BackButton
                onClick={() => {
                  if (
                    peopleList.length === 1 ||
                    peopleList.length === undefined
                  ) {
                    setLocationSelection(null);
                    setLocationList(null);
                    setPersonSelection(null);
                    setPeopleList(null);
                    setServiceSelection(null);
                    setServiceList(null);
                  } else {
                    setPersonSelection(null);
                    setPeopleList(null);
                    setServiceSelection(null);
                    setServiceList(null);
                  }
                }}
              >
                {`< Back`}
              </BackButton>
            </>
          )}

        {companyId &&
          locationSelection &&
          personSelection &&
          serviceSelection &&
          !success && (
            <>
              <Stage>
                <Title>Book your appointment</Title>
                <Form>
                  <div className="left">
                    <FormField>
                      <label htmlFor="name">Name</label>
                      <input
                        required
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
                        required
                        type="email"
                        name="email"
                        id="email"
                        onChange={e => setEmailSelection(e.target.value)}
                      />
                    </FormField>
                  </div>
                  <div className="right">
                    <CalendarContainer>
                      <CalendarPage
                        clicked={setDate}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                      />
                      <HR />
                      {timeList && dateSelection && (
                        <>
                          <FormSubHeading onClick={() => setCollapsed(true)}>
                            {dayjs(dateSelection).format('dddd, MMMM D')}
                            {timeSelection && (
                              <>
                                {' '}
                                at{' '}
                                {dayjs(
                                  `${dateSelection} ${timeSelection}`,
                                ).format('h:mm A')}
                                {!collapsed && (
                                  <DropArrow>
                                    <TbArrowBigUpFilled />
                                  </DropArrow>
                                )}
                              </>
                            )}
                          </FormSubHeading>
                        </>
                      )}
                      <StageCenter>
                        {MapTimes(
                          timeList,
                          setTimeSelection,
                          timeSelection,
                          orderDetails,
                          dateSelection,
                          collapsed,
                          setCollapsed,
                        )}
                      </StageCenter>
                    </CalendarContainer>
                    <HR />
                    <StageCenter
                      style={{
                        color: 'red',
                        display: 'none',
                        textAlign: 'center',
                      }}
                      id="error"
                    >
                      {error}
                    </StageCenter>
                    <FormButton
                      type="submit"
                      value="Book"
                      id="submit"
                      onClick={() => {
                        (
                          document.getElementById('error') as any
                        ).style.display = 'none';
                        (document.getElementById('submit') as any).disabled =
                          true;
                        (document.getElementById('submit') as any).value =
                          'Loading...';
                        (
                          document.getElementById('submit') as any
                        ).style.opacity = '0.5';
                        scheduleBooking(
                          companyId,
                          locationSelection,
                          personSelection,
                          serviceSelection,
                          customerSelection,
                          dateSelection,
                          timeSelection,
                          failureCallback,
                        );
                      }}
                    />
                  </div>
                </Form>
              </Stage>
              <BackButton
                onClick={() => {
                  console.log(serviceList.length);
                  if (
                    serviceList.length === 1 ||
                    serviceList.length === undefined
                  ) {
                    setPersonSelection(null);
                    setPeopleList(null);
                    setServiceSelection(null);
                    setServiceList(null);
                  } else {
                    setServiceSelection(null);
                    setServiceList(null);
                  }
                }}
              >
                {`< Back`}
              </BackButton>
            </>
          )}
        {success && (
          <Stage>
            <Title>Success!</Title>
            <HR />
            <P>
              Your appointment has been booked for{' '}
              <Bold>
                {dayjs(`${dateSelection} ${timeSelection}`).format('h:mm A')}
              </Bold>{' '}
              on <Bold>{dayjs(dateSelection).format('MMMM D YYYY')}</Bold>. You
              will receive an email confirmation shortly. {'\n'}Thank you for
              choosing <Bold>{handle}</Bold>!
            </P>
          </Stage>
        )}
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}
