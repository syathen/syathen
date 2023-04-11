import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const PageWrapper = styled.div`
  width: calc(100% - 2rem);
  margin: 0;
  padding: 0 1rem;
  box-sizing: content-box;
  color: ${p => p.theme.text};
  ${media.small} {
    width: calc(100% - 5rem);
    margin: 0 auto;
    padding: 0 2.5rem;
    max-width: 920px;
  }

`;
