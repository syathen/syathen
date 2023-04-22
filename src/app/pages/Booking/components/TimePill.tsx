import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const TimePill = styled.div`
  width: calc(50% - 1rem);
  margin: 0.2rem 0.5rem;
  background-color: ${p => p.theme.background};
  border: 2px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
  border-radius: 1rem;
  align-items: center;
  :hover,
  :focus {
    cursor: pointer;
    background-color: ${p => p.theme.backgroundVariant};
  }
  ${media.small} {
    width: calc(33.33% - 1rem);
    padding-left: 0.5rem;
    h1 {
      font-size: 0.8rem;
    }
  }
  ${media.medium} {
    width: calc(33.33% - 1rem);
    padding-left: 1rem;
    font-size: 0.8rem;
  }
  .info {
    align-items: center;
    display: inline-block;
    margin: 0.5rem 0;
    vertical-align: top !important;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    .timeSelected {
      background: ${p => p.theme.promptRed} !important;
      color: ${p => p.theme.background} !important;
    }
  }
  h1 {
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${media.mobile} {
      font-size: 0.8rem;
    }
    ${media.small} {
      font-size: 1rem;
    }
  }
  p {
    margin: 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    height: 0.5rem;
    aspect-ratio: 1;
    margin: 1rem;
    border-radius: 0.8rem;
    vertical-align: unset !important;
    object-fit: cover;
  }
`;

export const NoTime = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0.5rem auto;
  margin-top: 0;
  background-color: ${p => p.theme.background};
  border: 2px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
  border-radius: 0.5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1rem;
  h1 {
    margin: 0 auto;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info {
    align-items: center;
    display: inline-block;
    margin: 0 auto;
    vertical-align: top !important;
    max-width: 60%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const DropArrow = styled.div`
  flex-direction: row;
  float: right;
  /* align-items: center;
  justify-content: center; */
  min-height: 2rem;
  max-width: 2rem;
  cursor: pointer;
  svg {
    stroke-width: 2px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    color: ${p => p.theme.text};
  }
`;
