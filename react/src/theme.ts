import { createMuiTheme } from "@material-ui/core/styles";
import { fluidFontSize } from "helpers";

export const theme = createMuiTheme({
  spacing: 10,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
    },

    MuiFilledInput: { disableUnderline: true },
  },

  overrides: {
    MuiButton: {
      root: {
        borderRadius: "10px",
      },
    },
  },

  palette: {
    primary: { main: "#67D7FA", dark: "#292B34" },

    secondary: { main: "#EBEBEB" },

    background: {},
  },

  typography: {
    htmlFontSize: 10,
    fontFamily: '"Roboto", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h5: {
      fontWeight: 400,
      fontSize: fluidFontSize(2.4, 2),
      lineHeight: 1.334,
      letterSpacing: "0em",
    },

    h6: {
      fontWeight: 500,
      fontSize: fluidFontSize(2, 1.7),
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },

    subtitle1: {
      fontFamily: "Roboto, Arial, sans-serif",
      fontWeight: 400,
      fontSize: fluidFontSize(1.6, 1.35),
      lineHeight: 1.43,
      letterSpacing: "0.00938em",
    },

    subtitle2: {
      fontWeight: 500,
      fontSize: fluidFontSize(1.4, 1.25),
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },

    body1: {
      fontWeight: 400,
      fontSize: fluidFontSize(1.4, 1.25),
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },

    body2: {
      fontWeight: 400,
      fontSize: "1.2rem",
      lineHeight: 1.5,
      letterSpacing: "0.03333em",
    },

    button: {
      //@ts-ignore
      fontFamily: ["Rubik", "Roboto", "Arial", "sans-serif"],
    },
  },
});
