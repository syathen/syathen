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

export const P = styled.p`
  width: calc(100%-6rem);
  font-size: 1rem;
  margin: 0rem;
  color: ${p => p.theme.text};
`;

export const HR = styled.hr`
  width: 100%;
  min-width: 200px;
  height: 1px;
  background-color: ${p => p.theme.textSecondary};
  border: none;
  margin: 2px auto;
  margin-bottom: 1rem;
`;

export const Bold = styled.span`
  font-weight: 600;
`;
