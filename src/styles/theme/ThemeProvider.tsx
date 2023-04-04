import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectTheme } from './slice/selectors';
import { themes } from './themes';

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  useThemeSlice();

  // const theme = useSelector(selectTheme);
  const theme = themes.dark;
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
