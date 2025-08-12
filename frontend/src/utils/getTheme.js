import { THEMES } from "../constanst";

export const getCurrentTheme = (themeName) => {
  return THEMES.find((t) => t.name === themeName);
};