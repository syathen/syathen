import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    color: ${p => p.theme.text};
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
  input {
    background-color: ${p => p.theme.backgroundVariant} !important;
    border: 2px solid ${p => p.theme.border};
    color: ${p => p.theme.text};
    border-radius: 1rem;
    padding: 1rem 1rem;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;
