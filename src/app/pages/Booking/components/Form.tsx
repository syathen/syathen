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
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  ${media.medium} {
    margin-top: 3rem;
    display: flex;
    max-width: 800px;
  }
  .left {
    ${media.medium} {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
      width: 50%;
      margin: auto 0;
      margin-top: 2rem;
      margin-right: 1rem;
    }
  }
  .right {
    ${media.medium} {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
      width: 50%;
      margin: auto 0;
      margin-left: 1rem;
      min-height: 385px;
    }
  }
`;

export const FormButton = styled.input`
  max-width: 400px;
  width: 100%;
  background-color: ${p => p.theme.background};
  font-size: 1rem;
  border: 1px solid ${p => p.theme.border};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem auto;
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
`;

export const BackButton = styled.button`
  cursor: pointer;
  left: 0;
  bottom: 0;
  max-width: 100px;
  width: 50%;
  background-color: transparent;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  color: ${p => p.theme.promptRed};
  font-weight: 800;
  font-size: large;
  ${media.medium} {
    position: fixed;
  }
`;
