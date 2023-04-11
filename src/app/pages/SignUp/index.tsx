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
import { BsGoogle } from 'react-icons/bs';

import { auth } from 'utils/firebase-init';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

const GoogleLogin = async () => {
  try {
    signInWithPopup(auth, provider).then(result => {
      // emptyUser(result.user.uid, result.user.displayName, result.user.email);
      console.log(result);
    });
  } catch (e) {
    console.log(e);
  }
};

export function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(firstName, email, password);
  };

  return (
    <>
      <Helmet>
        <title>sign up</title>
        <meta name="description" content="the syathen sign up page" />
      </Helmet>
      <NavBar />
      <StageCenter>
        <Title>create an account.</Title>
        <SubTitle>it's free and only takes a minute.</SubTitle>
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <input
              type="text"
              placeholder="enter your first name"
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </FormSection>
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
          </FormSection>
          <FormSection>
            <input
              type="password"
              placeholder="create a password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormSection>
          {/* <FormSection>
            <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
            <input type="password" id="confirm-password" required />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="business">Business</FormLabel>
            <input type="text" id="business" />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <input type="tel" id="phone" />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="website">Website</FormLabel>
            <input type="url" id="website" />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="description">Description</FormLabel>
            <textarea id="description" />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="terms">Terms</FormLabel>
            <FormCheckbox type="checkbox" id="terms" required />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="privacy">Privacy</FormLabel>
            <FormCheckbox type="checkbox" id="privacy" required />
          </FormSection>
          <FormSection>
            <FormLabel htmlFor="marketing">Marketing</FormLabel>
            <FormCheckbox id="marketing" />
          </FormSection> */}
          <FormSection style={{ marginTop: '1.5rem' }}>
            <input type="submit" value="Sign Up" />
          </FormSection>
        </Form>
        <FormSection>
          <button
            className="google"
            onClick={() => {
              GoogleLogin();
            }}
          >
            {' '}
            <BsGoogle className="icon" /> Sign up with Google
          </button>
        </FormSection>
        <FormLink href="/signin" title="sign in." rel="noopener noreferrer">
          have an account? sign in.
        </FormLink>
      </StageCenter>
    </>
  );
}
