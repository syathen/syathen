import styled from 'styled-components/macro';

export const Title = styled.h1`
  width: calc(100% - 4rem);
  height: 2rem;
  /* background-color: ${p => p.theme.background}; */
  font-size: 1.5rem;
  /* position: fixed; */
  font-weight: 600;
  margin: 1rem 2rem;
  color: ${p => p.theme.text};
`;
