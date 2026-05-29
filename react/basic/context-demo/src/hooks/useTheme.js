// useTheme.js
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function useTheme() {
  return useContext(ThemeContext);
}
