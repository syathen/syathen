import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const Title = styled.h1`
  width: calc(100% - 4rem);
  height: 2rem;
  /* background-color: ${p => p.theme.background}; */
  font-size: 1.5rem;
  /* position: fixed; */
  font-weight: 600;
  margin: 1rem 2rem;
  color: ${p => p.theme.text};
  ${media.mobile} {
    width: calc(100% - 1rem);
    margin: 10px 0.5rem !important;
  }
`;
