//Colors taken from Pinata Figma design https://www.figma.com/file/Uaq250YCGDCK5NzrASJn7k/Pinata-Design-System?node-id=2%3A161
import { createTheme, Palette, Theme } from "@mui/material";
import { Components } from "@mui/material/styles/components";

const lightColorPalette: Partial<Palette> = {
  mode: "light",
  primary: {
    light: "#FFFFFF",
    main: "#2A40D7",
    dark: "#181818",
    contrastText: "#FFFFFF",
  },
  info: {
    light: "#3FD6EE",
    main: "#00BEDD",
    dark: "#00A0BB",
    contrastText: "#FFFFFF",
  },
  warning: {
    light: "#FFE669",
    main: "#F0BA30",
    dark: "#FFBD01",
    contrastText: "#000000",
  },
  error: {
    light: "#F8BDBD",
    main: "#e24243",
    dark: "#5C0707",
    contrastText: "#FFFFFF",
  },
};
const darkColorPalette: Partial<Palette> = {
  mode: "dark",
  primary: {
    light: "#953BED",
    main: "#2A40D7",
    dark: "#181818",
    contrastText: "#FFFFFF",
  },
  info: {
    light: "#3FD6EE",
    main: "#00BEDD",
    dark: "#00A0BB",
    contrastText: "#FFFFFF",
  },
  warning: {
    light: "#FFE669",
    main: "#F0BA30",
    dark: "#FFBD01",
    contrastText: "#000000",
  },
  error: {
    light: "#F8BDBD",
    main: "#e24243",
    dark: "#5C0707",
    contrastText: "#000000",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
  background: {
    default: "#000000",
    paper: "#000000",
  },
};
const typography = {
  typography: {
    fontFamily: "sans-serif",
    h1: {
      fontFamily: "Mulish",
      fontWeight: 900,
      fontSize: 34,
      lineHeight: "36px",
    },
    h2: {
      fontSize: 36,
      fontWeight: 900,
      lineHeight: "40px",
    },
    h3: {
      fontSize: 32,
      fontWeight: 900,
      lineHeight: "36px",
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
      lineHeight: "32px",
    },
    h5: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "28px",
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "28px",
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 500,
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "24px",
    },
    body2: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "20px",
    },
    caption: {
      fontSize: 14,
      fontWeight: 300,
      lineHeight: "24px",
    },
    button: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
    },
    overline: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "20px",
    },
    allVariants: {
      marginBottom: 5,
    },
  },
};
const commonComponents: Components<any> = {
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      size: "small",
    },
    styleOverrides: {
      root: {},
    },
  },
};

const legacy = createTheme({
  ...typography,
  spacing: 8,
  palette: lightColorPalette,
  components: {
    ...commonComponents,
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "4px 12px 40px 6px rgba(0, 0, 0, 0.09)",
          borderRadius: "30px",
          "&:hover": {
            boxShadow: "4px 12px 40px 6px rgba(0, 0, 0, 0.09)",
          },
        },
      },
    },
  },
});

const createModeTheme = (variant: "light" | "dark", baseTheme: Theme) => {
  return createTheme(baseTheme, {
    ...typography,
    components: {
      ...baseTheme.components,
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "@media (min-width: 0px)": {
              //TODO: Refactor using MUI theme breakpoints
              top: "64px",
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            backgroundColor: baseTheme.palette.background.paper,
            boxShadow:
              "0px 4px 16px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)",
            padding: "16px",
            color: baseTheme.palette.text.primary,
            width: "fit-content",
          },
          message: {
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "100px",
            height: "44px",
            padding: "10px 20px",
            gap: "10px",
            width: "fit-content",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              variant === "light"
                ? "0px 2px 7px 1px rgb(226 224 226)"
                : "0px 2px 7px 1px rgb(86 84 86)",
            borderRadius: "16px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: baseTheme.palette.text.primary,
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              "& legend": {
                display: "none",
              },
              maxWidth: "387px",
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& legend": {
                  display: "none",
                },
                maxWidth: "387px",
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                "& legend": {
                  display: "none",
                },
                maxWidth: "387px",
              },
            },
          },
        },
      },
    },
  });
};

const lightBaseTheme = createTheme({
  palette: lightColorPalette,
  components: {
    ...commonComponents,
  },
});

const darkBaseTheme = createTheme({
  palette: darkColorPalette,
  components: {
    ...commonComponents,
  },
});

const dark = createModeTheme("dark", darkBaseTheme);
const light = createModeTheme("light", lightBaseTheme);

export const Themes = {
  legacy,
  light,
  dark,
};
