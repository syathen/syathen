/**
 * Asynchronously loads the component for HomePage
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import styled from 'styled-components/macro';
import { auth } from 'utils/firebase-init';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dashboard = lazyLoad(
  () => import('./index'),
  module => module.default,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const DashboardWrapper = () => {
  const history = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        history('/signin');
      }
    });
  }, [history]);

  return <Dashboard />;
};

// export default DashboardWrapper;
