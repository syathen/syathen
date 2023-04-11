import * as React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';

export function Logo() {
  return (
    <Wrapper>
      <Title>
        <a href="/">syathen</a>
      </Title>
      <Description>the bookings business</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
  a {
    color: ${p => p.theme.text};
    text-decoration: none;
  }
  ${media.mobile} {
    font-size: 2rem;
  }
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
  display: none;
  ${media.small} {
    display: inherit;
  }
`;
