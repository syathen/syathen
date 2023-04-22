import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const DayView = styled.div`
  position: relative;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 1rem 1rem;
  min-height: 20rem;
  width: 100%;
  float: right;
  border-radius: 1rem;
  border: 1px solid ${p => p.theme.backgroundVariant};
  hr {
    display: inline-flex;
    transform: translateY(-5px);
    border: 1px solid ${p => p.theme.textSecondary};
    width: 100%;
    margin: 0px;
  }
  ${media.mobile} {
    padding: 0.5rem 0.5rem;
    width: calc(100%-1rem);
    margin: 0 0.5;
    font-size: smaller;
  }
  ${media.small} {
    font-size: initial;
  }
  ${media.medium} {
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 1rem 1rem;
    width: calc(60% - 2rem);
    font-size: initial;
  }
`;

export const Header = styled.table`
  display: inline-flex;
  position: sticky;
  flex-direction: row;
  min-height: 2rem;
  width: 100%;
  padding: 0rem 0.75rem;
  border-radius: 0.5rem;
  color: ${p => p.theme.text};
  tbody {
    width: 100%;
  }
  tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    width: inherit;
    th {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      cursor: pointer;
      &:first-child {
        width: 50%;
      }
    }
  }
`;

export const Appointments = styled.div`
  overflow: auto;
  width: 100%;
  max-height: calc(20rem + 20px);
  transform: translateY(-10px);
`;

export const Appointment = styled.table`
  z-index: 2;
  display: inline-flex;
  flex-direction: row;
  min-height: 3rem;
  width: inherit;
  margin-bottom: 2px;
  border: 1px solid ${p => p.theme.borderLight};
  background-color: ${p => p.theme.backgroundVariant};
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: ${p => p.theme.text};
  :hover {
    background-color: ${p => p.theme.border};
  }
  tbody {
    width: 100%;
  }
  tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    width: inherit;
    td {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      &:first-child {
        width: 50%;
      }
    }
  }
`;
export const DateSeperator = styled.table`
  display: inline-flex;
  flex-direction: row;
  min-height: 1rem;
  width: inherit;
  margin-top: 0px;
  color: ${p => p.theme.text};
  tbody {
    width: 100%;
  }
  tr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    width: inherit;
    td {
      z-index: -1;
      transform: translateY(3px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      width: 100%;
    }
  }
`;
