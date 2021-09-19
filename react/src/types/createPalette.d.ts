import * as createPalette from '@material-ui/core/styles/createPalette';

/*
 * Read https://medium.com/javascript-in-plain-english/extend-material-ui-theme-in-typescript-a462e207131f
 */

declare module '@material-ui/core/styles/createPalette' {
  interface TypeText {}

  interface TypeBackground {}

  interface Border {}

  interface Icon {}

  interface Message {}

  interface Button {}

  interface Color {}

  interface PaletteOptions {}

  interface Palette {}
}
