import { GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "rgba(178,135,120,0.69)",
  },
  Button: {
    borderHover: "rgba(178,135,120,0.69)",
    textColorHover: "rgba(178,135,120,0.69)",
    textColor: "rgba(107,114,128)",
    textColorPrimary: "rgba(178,135,120,0.69)",
  },
  BackTop: {
    iconColorHover: "rgba(178,135,120,0.69)",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "rgba(178,135,120,0.69)",
      },
    },
  },
};
