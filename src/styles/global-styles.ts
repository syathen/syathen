import { createGlobalStyle } from 'styled-components';
import { StyleConstants } from './StyleConstants';
import styled from 'styled-components/macro';

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${p => p.theme.background};
    overflow: overlay;
  }

    ::-webkit-scrollbar {
       width: 10px;
       /* background: transparent; */
       background: ${p => p.theme.background};
    }

    ::-webkit-scrollbar-thumb {
       background: ${p => p.theme.textSecondary};
       border: 1px solid ${p => p.theme.background};
       border-radius: 5px;
    }

  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  
  p,
  label {
    line-height: 1.5em;
  }

  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
