import styled from 'styled-components/macro';
import { media } from 'styles/media';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { CalendarPage, CalendarContainer } from '../../Booking/Calendar/Calendar';
import { TimePill, NoTime } from '../../Booking/components/TimePill';
import { FormField } from './Form';
import {
  generateTimeSlots,
  scheduleBooking,
  getCompanyAlias,
} from 'utils/bookingUtils';

async function getPeople(locationId: string) {
  if (!locationId) return [];
  const response = await axios.get(
    `https://api.syathen.com/employees/${locationId}/`,
  );
  return response.data;
}

async function getService(serviceId: string) {
  if (!serviceId) return null;
  const response = await axios.get(
    `https://api.syathen.com/service/${serviceId}/`,
  );
  return response.data;
}

const STAGE_LABELS = ['Who', 'What', 'When', 'Details', 'Confirm'];

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const Book = (props: any): any => {
  const { slug, location, locations, onBookingCreated } = props;

  const [companyId, setCompanyId] = useState<string>('');
  const [people, setPeople] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);

  const [person, setPerson] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [dateSelection, setDateSelection] = useState<any>(null);
  const [timeSelection, setTimeSelection] = useState<any>(null);
  const [timeList, setTimeList] = useState<any[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (slug && !companyId) {
      getCompanyAlias(slug).then(id => {
        if (id) setCompanyId(id);
      });
    }
  }, [slug, companyId]);

  useEffect(() => {
    if (location) {
      getPeople(location).then(data => {
        if (data) setPeople(data);
      });
    }
  }, [location]);

  useEffect(() => {
    if (person && person.services) {
      setServiceList([]);
      person.services.forEach((serviceId: string) => {
        getService(serviceId).then(data => {
          if (data && data.meta?.is_active !== false) {
            setServiceList(prev => [...prev, data]);
          }
        });
      });
    }
  }, [person]);

  useEffect(() => {
    if (person && dateSelection) {
      const employeeId = person.employee_id || person.id;
      generateTimeSlots(
        dayjs(dateSelection).format('YYYY-MM'),
        dayjs(dateSelection).format('DD'),
        employeeId,
      ).then(res => {
        if (res) {
          setTimeList(res);
          setCollapsed(res.length > 0);
        }
      });
    }
  }, [dateSelection, person]);

  const handleDateClick = useCallback((date: any) => {
    setDateSelection(date);
    setTimeSelection(null);
    setCollapsed(false);
  }, []);

  const handleBack = useCallback(() => {
    if (stage === 1) {
      setPerson(null);
      setServiceList([]);
      setService(null);
    } else if (stage === 2) {
      setService(null);
      setDateSelection(null);
      setTimeSelection(null);
      setTimeList([]);
    } else if (stage === 3) {
      setDateSelection(null);
      setTimeSelection(null);
      setTimeList([]);
    } else if (stage === 4) {
      // keep everything, just go back
    }
    setStage(s => s - 1);
    setError('');
  }, [stage]);

  const handlePersonSelect = useCallback((p: any) => {
    setPerson(p);
    setStage(1);
  }, []);

  const handleServiceSelect = useCallback((s: any) => {
    setService(s);
    setStage(2);
  }, []);

  const handleTimeSelect = useCallback(
    (time: string) => {
      setTimeSelection(time);
      Array.from(document.getElementsByClassName('time')).forEach(el => {
        el.classList.remove('timeSelected');
      });
      const el = document.getElementById(`${dateSelection}-${time}`);
      if (el) el.classList.add('timeSelected');
    },
    [dateSelection],
  );

  const handleSubmit = useCallback(async () => {
    if (!customer.name) {
      setError('Name is required');
      return;
    }
    setSubmitting(true);
    setError('');

    const locationObj = locations?.find(
      (l: any) => l.location_id === location,
    );

    const failureCallback = (failed: boolean, message: string) => {
      setSubmitting(false);
      if (failed) {
        setError(message);
      } else {
        setStage(5);
        if (onBookingCreated) onBookingCreated();
      }
    };

    await scheduleBooking(
      companyId,
      locationObj,
      person,
      service,
      customer,
      dateSelection,
      timeSelection,
      failureCallback,
    );
  }, [
    companyId,
    customer,
    dateSelection,
    location,
    locations,
    onBookingCreated,
    person,
    service,
    timeSelection,
  ]);

  const resetWizard = useCallback(() => {
    setStage(0);
    setPerson(null);
    setService(null);
    setServiceList([]);
    setDateSelection(null);
    setTimeSelection(null);
    setTimeList([]);
    setCustomer({ name: '', email: '', phone: '' });
    setError('');
    setSubmitting(false);
  }, []);

  if (!slug || !location || !locations) return null;

  return (
    <BookNewView key={location}>
      <ProgressBar>
        {STAGE_LABELS.map((label, i) => (
          <ProgressStep key={label} $active={i === stage} $done={i < stage}>
            {label}
          </ProgressStep>
        ))}
      </ProgressBar>

      {stage > 0 && stage < 5 && (
        <BackBtn onClick={handleBack}>&larr; Back</BackBtn>
      )}

      {stage === 0 && (
        <>
          <StageTitle>Who?</StageTitle>
          {people.length > 0 ? (
            people
              .filter((p: any) => p.is_active !== false)
              .map((p: any) => (
                <SelectionItem key={p.employee_id || p.id} onClick={() => handlePersonSelect(p)}>
                  <p>{p.name || `${p.first_name} ${p.last_name}`}</p>
                </SelectionItem>
              ))
          ) : (
            <p>No employees available</p>
          )}
        </>
      )}

      {stage === 1 && (
        <>
          <StageTitle>What?</StageTitle>
          {serviceList.length > 0 ? (
            serviceList
              .filter((s: any) => s.meta?.is_active !== false)
              .map((s: any) => (
                <SelectionItem
                  key={s.service_id}
                  onClick={() => handleServiceSelect(s)}
                >
                  <p>{s.service_name || s.name}</p>
                  <ServiceMeta>
                    {s.price != null && <span>{USDollar.format(s.price)}</span>}
                    {s.duration != null && <span>{s.duration} min</span>}
                  </ServiceMeta>
                </SelectionItem>
              ))
          ) : (
            <p>Loading services...</p>
          )}
        </>
      )}

      {stage === 2 && (
        <>
          <StageTitle>When?</StageTitle>
          <CalendarContainer>
            <CalendarPage
              clicked={handleDateClick}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            {timeList.length > 0 && dateSelection && collapsed && (
              <>
                <TimeLabel>
                  {dayjs(dateSelection).format('dddd, MMMM D')}
                  {timeSelection && (
                    <> at {dayjs(`${dateSelection} ${timeSelection}`).format('h:mm A')}</>
                  )}
                </TimeLabel>
                <TimeGrid>
                  {timeList.map((time: string) => (
                    <TimePill
                      key={time}
                      id={`${dateSelection}-${time}`}
                      className="time"
                      onClick={() => handleTimeSelect(time)}
                    >
                      <div className="info">
                        <h1 className="name">
                          {dayjs(`${dateSelection} ${time}`).format('h:mm A')}
                        </h1>
                      </div>
                    </TimePill>
                  ))}
                </TimeGrid>
              </>
            )}
            {dateSelection && timeList.length === 0 && (
              <NoTime>
                <div className="info">
                  <h1 className="name">No availability for this date.</h1>
                </div>
              </NoTime>
            )}
            {!dateSelection && (
              <NoTime>
                <div className="info">
                  <h1 className="name">Pick a date.</h1>
                </div>
              </NoTime>
            )}
          </CalendarContainer>
          {dateSelection && timeSelection && (
            <SubmitButton onClick={() => setStage(3)}>
              Continue
            </SubmitButton>
          )}
        </>
      )}

      {stage === 3 && (
        <>
          <StageTitle>Customer Details</StageTitle>
          <FormField>
            <label htmlFor="admin-cust-name">Name *</label>
            <input
              type="text"
              id="admin-cust-name"
              value={customer.name}
              onChange={e =>
                setCustomer((prev: any) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </FormField>
          <FormField>
            <label htmlFor="admin-cust-email">Email</label>
            <input
              type="email"
              id="admin-cust-email"
              value={customer.email}
              onChange={e =>
                setCustomer((prev: any) => ({ ...prev, email: e.target.value }))
              }
            />
          </FormField>
          <FormField>
            <label htmlFor="admin-cust-phone">Phone</label>
            <input
              type="tel"
              id="admin-cust-phone"
              value={customer.phone}
              onChange={e =>
                setCustomer((prev: any) => ({ ...prev, phone: e.target.value }))
              }
            />
          </FormField>
          {customer.name && (
            <SubmitButton onClick={() => setStage(4)}>
              Review Booking
            </SubmitButton>
          )}
        </>
      )}

      {stage === 4 && (
        <>
          <StageTitle>Confirm Booking</StageTitle>
          <SummaryCard>
            <SummaryRow>
              <SummaryLabel>Employee</SummaryLabel>
              <SummaryValue>
                {person?.name || `${person?.first_name} ${person?.last_name}`}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Service</SummaryLabel>
              <SummaryValue>
                {service?.service_name || service?.name}
                {service?.price != null && ` - ${USDollar.format(service.price)}`}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Date</SummaryLabel>
              <SummaryValue>
                {dayjs(dateSelection).format('dddd, MMMM D, YYYY')}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Time</SummaryLabel>
              <SummaryValue>
                {dayjs(`${dateSelection} ${timeSelection}`).format('h:mm A')}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Customer</SummaryLabel>
              <SummaryValue>{customer.name}</SummaryValue>
            </SummaryRow>
            {customer.email && (
              <SummaryRow>
                <SummaryLabel>Email</SummaryLabel>
                <SummaryValue>{customer.email}</SummaryValue>
              </SummaryRow>
            )}
            {customer.phone && (
              <SummaryRow>
                <SummaryLabel>Phone</SummaryLabel>
                <SummaryValue>{customer.phone}</SummaryValue>
              </SummaryRow>
            )}
          </SummaryCard>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Booking...' : 'Book Appointment'}
          </SubmitButton>
        </>
      )}

      {stage === 5 && (
        <>
          <StageTitle>Booked!</StageTitle>
          <SuccessText>
            Appointment booked for{' '}
            <strong>
              {dayjs(`${dateSelection} ${timeSelection}`).format('h:mm A')}
            </strong>{' '}
            on{' '}
            <strong>{dayjs(dateSelection).format('MMMM D, YYYY')}</strong> with{' '}
            <strong>
              {person?.name || `${person?.first_name} ${person?.last_name}`}
            </strong>
            .
          </SuccessText>
          <SubmitButton onClick={resetWizard}>New Booking</SubmitButton>
        </>
      )}
    </BookNewView>
  );
};

export const BookNewView = styled.div`
  position: relative;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 1rem 1rem;
  min-height: 20rem;
  width: 100%;
  float: right;
  border-radius: 1rem;
  border: 1px solid ${p => p.theme.backgroundVariant};
  color: ${p => p.theme.text};
  hr {
    display: inline-flex;
    transform: translateY(-5px);
    border: 1px solid ${p => p.theme.textSecondary};
    width: 100%;
    margin: 0px;
  }
  ${media.mobile} {
    padding: 0.5rem 0.5rem;
    width: calc(100% - 1rem);
    margin: 0 0.5rem;
    font-size: smaller;
  }
  ${media.small} {
    font-size: initial;
  }
  ${media.medium} {
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 1rem 1rem;
    width: calc(40% - 2rem);
    font-size: initial;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0 0.25rem;
  gap: 0.25rem;
`;

const ProgressStep = styled.div<{ $active: boolean; $done: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  font-weight: ${p => (p.$active ? '700' : '400')};
  color: ${p =>
    p.$active
      ? p.theme.primary
      : p.$done
        ? p.theme.promptGreen
        : p.theme.textSecondary};
  padding: 0.25rem 0;
  border-bottom: 2px solid
    ${p =>
      p.$active
        ? p.theme.primary
        : p.$done
          ? p.theme.promptGreen
          : p.theme.border};
`;

const StageTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0.5rem 0 1rem 0;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.primary};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0;
  margin-bottom: 0.5rem;
`;

export const SelectionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 1rem;
  border: 1px solid ${p => p.theme.borderLight};
  background-color: ${p => p.theme.backgroundVariant};
  color: ${p => p.theme.text};
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.border};
  }
  p {
    margin: 0;
  }
  ${media.mobile} {
    padding: 0.5rem 0.5rem;
    font-size: smaller;
  }
  ${media.small} {
    font-size: initial;
  }
  ${media.medium} {
    padding: 0.5rem 1rem;
    font-size: initial;
  }
`;

const ServiceMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: ${p => p.theme.textSecondary};
`;

const TimeLabel = styled.div`
  text-align: center;
  font-weight: 600;
  margin: 0.5rem 0;
  font-size: 0.95rem;
`;

const TimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 12rem;
  overflow-y: auto;
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: none;
  border-radius: 0.75rem;
  background-color: ${p => p.theme.primary};
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
`;

const SummaryCard = styled.div`
  border: 1px solid ${p => p.theme.border};
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 0.5rem 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const SummaryValue = styled.span`
  font-size: 0.9rem;
  text-align: right;
  color: ${p => p.theme.textSecondary};
`;

const ErrorText = styled.p`
  color: ${p => p.theme.promptRed};
  text-align: center;
  margin: 0.5rem 0;
  font-weight: 600;
`;

const SuccessText = styled.p`
  text-align: center;
  line-height: 1.6;
  margin: 1rem 0;
`;
