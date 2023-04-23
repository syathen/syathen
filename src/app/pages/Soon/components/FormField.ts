import styled from 'styled-components/macro';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormLink = styled.a`
  color: ${p => p.theme.textSecondary};
  font-size: 0.8rem;
  text-decoration: none;
  padding: 0 0.5rem;
  :hover {
    text-decoration: underline;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  :active {
    outline: none;
  }
  input {
    width: 100%;
    background-color: ${p => p.theme.background};
    font-size: 1rem;
    border: 1px solid ${p => p.theme.border};
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 0.5rem 0;
    color: ${p => p.theme.text};
    ::placeholder {
      color: ${p => p.theme.text};
    }
  }
  input[type='submit'] {
    font-weight: 800;
    font-size: large;
    background-color: ${p => p.theme.text};
    color: ${p => p.theme.background};
    border: none;
    cursor: pointer;
  }
  button {
    width: 100%;
    background-color: ${p => p.theme.background};
    font-size: 1rem;
    border: 1px solid ${p => p.theme.border};
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 0.5rem 0;
    color: ${p => p.theme.text};
    font-weight: 800;
    font-size: large;
    background-color: ${p => p.theme.promptRed};
    color: ${p => p.theme.background};
    border: none;
    cursor: pointer;
    .icon {
      margin-right: 0.5rem;
    }
  }
`;

export const FormCheckbox = styled.input`
  display: inline-flex;
  width: 1rem;
  height: 1rem;
  background-color: ${p => p.theme.background};
  font-size: 1rem;
  border: 1px solid ${p => p.theme.border};
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  color: ${p => p.theme.text};
`;

export const FormLabel = styled.label`
  display: inline-flex;
  font-size: 1rem;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin: 0.5rem 0;
`;
