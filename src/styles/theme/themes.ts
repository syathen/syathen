const lightTheme = {
  primary: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
  promptGreen: 'rgba(62, 255, 51 , 0.8)',
  promptRed: 'rgba(255, 51, 51 , 0.8)',
  promptBlue: 'rgba(51, 255, 255 , 0.8)',
};

const darkTheme: Theme = {
  primary: 'rgba(220,120,95,1)',
  text: 'rgba(241,233,231,1)',
  textSecondary: 'rgba(241,233,231,0.6)',
  background: 'rgba(0,0,0,1)',
  backgroundVariant: 'rgba(28,26,26,1)',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
  promptGreen: 'rgba(149, 233, 48 , 0.7)',
  promptRed: 'rgba(233, 87, 48 , 0.7)',
  promptBlue: 'rgba(48, 233, 233 , 0.7)',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
