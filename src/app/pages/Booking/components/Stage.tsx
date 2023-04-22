import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const Stage = styled.div`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  ${media.mobile} {
    border-radius: 0;
    top: 0;
    display: inline-flex;
    /* position: absolute; */
    margin: 0;
  }
  ${media.medium} {
    /* margin: 0 3rem; */
    padding: 0 3rem;
  }
`;
