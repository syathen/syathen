import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Title } from './components/Title';
import { SubTitle } from './components/SubTitle';
import {
  Form,
  FormCheckbox,
  FormSection,
  FormLabel,
  FormLink,
} from './components/FormField';
import { StageCenter } from './components/StageCenter';

import { auth } from 'utils/firebase-init';

import { GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        document.getElementById('email')!.style.border = 'initial';
        setErrorMessage('');
        setSuccess(true);
      })
      .catch(error => {
        document.getElementById('email')!.style.border = '1px solid red';
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            document.getElementById('email')!.style.border = '1px solid red';
            setErrorMessage('invalid email');
            break;
          case 'auth/user-not-found':
            document.getElementById('email')!.style.border = '1px solid red';
            setErrorMessage('user not found');
            break;
          default:
            break;
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>forgot password</title>
        <meta name="description" content="the syathen sign in page" />
      </Helmet>
      <NavBar />
      <StageCenter>
        <Title>forgot your password?</Title>
        <SubTitle>no worries, we got you.</SubTitle>
        {!success ? (
          <Form onSubmit={handleSubmit}>
            <FormSection>
              <input
                type="email"
                placeholder="enter your email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <p
                style={{
                  color: 'red',
                  fontSize: '0.8rem',
                  margin: '0',
                  transform: 'translate(1rem, -0.5rem)',
                }}
              >
                {success ? '' : errorMessage}
              </p>
            </FormSection>
            <FormSection style={{ marginTop: '1.5rem' }}>
              <input type="submit" value="Reset Password" />
            </FormSection>
          </Form>
        ) : (
          <FormLabel style={{ marginTop: '0rem', display: 'block' }}>
            <p style={{ fontSize: '1.5rem' }}>
              if an account with that email exists, you will receive an email
              with a link to reset your password.
            </p>
            <p>
              if you do not receive an email, please check your spam folder.
            </p>
          </FormLabel>
        )}
      </StageCenter>
    </>
  );
}
