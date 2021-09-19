import * as createBreakpoints from '@material-ui/core/styles/createBreakpoints';

/*
 * Read https://material-ui.com/customization/breakpoints/#theme-breakpoints-between-start-end-media-query
 */

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
