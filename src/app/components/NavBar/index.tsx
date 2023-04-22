import * as React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';

export function NavBar() {
  const [login, setLogin] = React.useState(false);
  // const [loggedin, setLoggedIn] = React.useState(false);
  if (
    window.location.pathname === '/signin' ||
    window.location.pathname === '/signup'
  ) {
    if (!login) {
      setLogin(true);
    }
  }
  return (
    <Wrapper>
      <PageWrapper>
        <Logo />
        {!login && <Nav />}
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
