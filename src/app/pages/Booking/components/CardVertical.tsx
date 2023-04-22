import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const Card = styled.div`
  width: 100%;
  background-color: ${p => p.theme.background};
  border: 2px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
  border-radius: 1rem;
  margin: 0.5rem 0.5rem;
  display: block;
  text-align: left;
  :hover,
  :focus {
    cursor: pointer;
    background-color: ${p => p.theme.backgroundVariant};
  }
  ${media.mobile} {
    width: calc(50% - 1rem);
    text-align: center;
    display: block;
    .info {
      margin-top: 0rem;
      margin-bottom: 1rem;
    }
  }
  ${media.small} {
    text-align: left;
    img {
      margin: 3rem;
    }
    .info {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  ${media.medium} {
    width: calc(33.33% - 2rem);
    margin: 0.5rem 0.5rem;
    .info {
      margin: 0rem;
      margin-top: 1.5rem;
    }
  }
  .info {
    display: inline-block;
    vertical-align: top !important;
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  h1 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    margin: 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    height: 6rem;
    aspect-ratio: 1;
    margin: 1rem;
    border-radius: 0.8rem;
    vertical-align: unset !important;
    object-fit: cover;
  }
`;
