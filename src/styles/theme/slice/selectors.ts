import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';
import { themes } from '../themes';
import { isSystemDark } from '../utils';

const selectSlice = (state: RootState) => state.theme || initialState;
export const selectTheme = createSelector([selectSlice], themeState => {
  const { selected } = themeState;
  if (selected === 'system') {
    return isSystemDark ? themes.dark : themes.light;
  }
  return themes[selected];
});

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.selected,
);
