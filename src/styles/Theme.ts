import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    gray: string;
    blue: string;
    offWhite: string;
  }
}

export const theme: DefaultTheme = {
  gray: '#DDDDDD',
  blue: '#7695EC',
  offWhite: '##FFFFFF',
};
