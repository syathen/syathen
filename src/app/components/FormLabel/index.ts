import styled from 'styled-components/macro';

export const FormLabel = styled.label`
  text-transform: uppercase;
  font-weight: normal;
  margin: 0;
  padding: 0;
  color: ${p => p.theme.textSecondary};
  font-size: 0.75rem;
`;

export const FormSubHeading = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5rem;
  margin-bottom: 1rem;
  padding: 0;
  color: ${p => p.theme.text};
  text-align: center;
`;
