import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles' {
  interface Palette {
    data: {
      main: string;
    };
    label: {
      main: string;
    };
    dark: {
      main: string;
    };
    tertiary: {
      main: string;
    };
    gold: {
      main: string;
    };
    silver: {
      main: string;
    };
    bronze: {
      main: string;
    };
  }
}

declare module '@mui/material/styles/createTypography' {
  interface SecondaryFont {
    fontFamily: string;
  }
  interface FontStyle {
    secondaryFont: SecondaryFont;
    color: string;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    dark: PaletteColor;
    data: PaletteColor;
    label: PaletteColor;
    tertiary: PaletteColor;
    gold: PaletteColor;
    silver: PaletteColor;
    bronze: PaletteColor;
  }
  interface PaletteOptions {
    dark: PaletteColorOptions;
    data: PaletteColorOptions;
    label: PaletteColorOptions;
    tertiary: PaletteColorOptions;
    gold: PaletteColorOptions;
    silver: PaletteColorOptions;
    bronze: PaletteColorOptions;
  }
}
