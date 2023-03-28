import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const StageCenter = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  top: 0;
  align-self: flex-start;
  max-height: 40vh;
  overflow-y: scroll;
  border-bottom: 1px solid ${p => p.theme.border};
  ${media.mobile} {
    margin: 0;
    width: 100%;
    padding: 0px;
  }
  ${media.small} {
    margin: 0 auto;
    width: 80%;
    padding: 0 1rem;
  }
  ${media.medium} {
    margin: 0 auto;
    width: 50%;
  }
`;
