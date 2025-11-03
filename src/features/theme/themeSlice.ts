import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";
const storedTheme = (localStorage.getItem("theme") as Theme) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: storedTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.currentTheme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
