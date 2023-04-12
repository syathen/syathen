import * as React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';

export function Nav() {
  return (
    <Wrapper>
      <SignInButton
        className="nav-sign-in"
        href="/signin"
        // target="_blank"
        title="Sign In"
        rel="noopener noreferrer"
      >
        Sign In
      </SignInButton>
      <SignUpButton
        className="nav-sign-up"
        href="/signup"
        // target="_blank"
        title="Sign Up"
        rel="noopener noreferrer"
      >
        Sign Up
      </SignUpButton>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-left: 1rem;
`;

const SignUpButton = styled.a`
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

const SignInButton = styled.a`
  color: ${p => p.theme.background};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  height: 2rem;
  padding: 0.5rem;
  margin: 1rem 0rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;
  background-color: ${p => p.theme.text};
  border-radius: 0.5rem;

  ${media.small} {
    margin: 1rem 0.5rem;
    padding: 0.5rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;
