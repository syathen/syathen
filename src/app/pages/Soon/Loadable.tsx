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

const Soon = lazyLoad(
  () => import('./index'),
  module => module.Soon,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);

export const SoonWrapper = () => {
  const history = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        history('/signin');
      }
    });
  }, [history]);

  return <Soon />;
};

// export default DashboardWrapper;
