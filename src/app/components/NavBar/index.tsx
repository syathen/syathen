import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { media } from 'styles/media';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { auth } from 'utils/firebase-init';

export function NavBar() {
  const [login, setLogin] = useState(false);
  const [loggedin, setLoggedIn] = useState(false);
  if (
    window.location.pathname === '/signin' ||
    window.location.pathname === '/signup'
  ) {
    if (!login) {
      setLogin(true);
    }
  }

  const history = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
  }, [history]);

  return (
    <Wrapper>
      <PageWrapper>
        <Logo />
        {!login && !loggedin && <Nav />}
        {loggedin && window.location.pathname !== '/dashboard' && (
          <DashboardButton onClick={() => history('/dashboard')}>
            Dashboard
          </DashboardButton>
        )}
      </PageWrapper>
    </Wrapper>
  );
}

const PageWrapper = styled.div`
  width: calc(100% - 1rem);

  margin: 0;
  padding: 0 0.5rem;
  box-sizing: content-box;
  color: ${p => p.theme.text};
  ${media.mobile} {
    padding: 0 1.5rem;
  }
  ${media.medium} {
    margin: 0 auto;
    max-width: 1100px;
  }
`;

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: inherit;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};
  z-index: 2;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
  }
`;

const DashboardButton = styled.a`
  color: ${p => p.theme.background};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  height: 2rem;
  padding: 0.5rem;
  margin: 1rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;
  background-color: ${p => p.theme.promptRed};
  border-radius: 0.5rem;

  ${media.small} {
    margin: 1rem 0.5rem;
    padding: 0.5rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;
