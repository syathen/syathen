import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Title } from './components/Title';
import { SubTitle } from './components/SubTitle';
import { StageCenter } from './components/StageCenter';
import { BsGoogle } from 'react-icons/bs';

import { auth } from 'utils/firebase-init';

export function Soon() {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirstName(
          user.displayName
            ? user.displayName.split(' ')[0]
            : (user.email as any).split('@')[0],
        );
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>sign up</title>
        <meta name="description" content="the syathen sign up page" />
      </Helmet>
      <NavBar />
      <StageCenter>
        <Title>Hey {firstName}.</Title>
        <SubTitle>Thanks for being a part of Syathen!</SubTitle>
        <SubTitle>
          We're still working hard on this part of the site, but check back
          soon.
        </SubTitle>
      </StageCenter>
    </>
  );
}
