import 'styled-components';
import { lightTheme } from './src/styles/theme';

type ThemeType = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}