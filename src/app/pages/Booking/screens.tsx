// This file contains exports for all different screens for the booking flow
// 1st Screen with locations (skipped if only one location)
// 2nd Screen with Professionals (skipped if only one professional)
// 3rd Screen with Services (skipped if only one service)
// 4th Screen with Date and Time
// 5th Screen with Customer Details (name, email, phone) (skipped if not configured)
// 6th Screen with Payment Details (card details, paypal, etc) (skipped if not configured)
// 7th Screen with Confirmation

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { Stage } from './components/Stage';
import { Title } from './components/Title';
import {
  MapLocations,
  MapPeople,
  MapServices,
  mapAvailableDates,
  MapTimes,
} from './utils';
import {
  scheduleBooking,
  getCompanyAlias,
  getLocationsList,
  getServiceList,
  getEmployeeListByLocation,
  getServiceListByEmployee,
} from 'utils/bookingUtils';

export const ShowLocations = (
  handle: string,
  setLocationSelection: any,
  orderDetails: any,
) => {
  const { t } = useTranslation();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getLocationsList(handle)
      .then(res => {
        setLocations(res);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setErrorMessage(err);
        setLoading(false);
      });
  }, [handle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{errorMessage}</div>;
  }

  if (locations.length === 1) {
    setLocationSelection(locations[0]);
    orderDetails.location = locations[0];
    return <div />;
  }

  return (
    <Stage>
      <Title title={t('booking:selectLocation')} />
      <div className="row">
        {MapLocations(locations, setLocationSelection, orderDetails)}
      </div>
    </Stage>
  );
};
