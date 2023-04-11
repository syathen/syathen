import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const Card = styled.div`
  margin: 0.5rem 0.5rem;
  background-color: ${p => p.theme.background};
  border: 2px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
  border-radius: 1rem;
  width: 100%;
  display: flex;
  text-overflow: ellipsis;
  padding: 0.5rem;
  :hover,
  :focus {
    cursor: pointer;
    background-color: ${p => p.theme.backgroundVariant};
  }
  ${media.mobile} {
    width: calc(100%);
    margin: 0.5rem 0rem;
    display: flex;
  }
  ${media.small} {
    width: calc(50% - 1rem);
    margin: 0.5rem 0.5rem;
    display: flex;
  }
  ${media.medium} {
    width: calc(33.33% - 1rem);
    margin: 0.5rem 0.5rem;
    display: flex;
  }
  .info {
    display: inline-block;
    margin: 1rem 0;
    vertical-align: top !important;
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    margin: 0.5rem;
    margin-right: 1rem;
    border-radius: 0.8rem;
    vertical-align: unset !important;
    object-fit: cover;
  }
`;
