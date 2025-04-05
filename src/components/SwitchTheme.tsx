"use client";
import { PrimeReactContext, PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import { useEffect, useState, useContext } from "react";

export default function SwitchTheme() {
  const { changeTheme } = useContext(PrimeReactContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    const newTheme = isDarkTheme
      ? "/themes/lara-light-indigo/theme.css"
      : "/themes/lara-dark-indigo/theme.css";
    changeTheme?.(
      isDarkTheme
        ? "/themes/lara-dark-indigo/theme.css"
        : "/themes/lara-light-indigo/theme.css",
      newTheme,
      "theme-link",
      () => {
        setIsDarkTheme(!isDarkTheme);
      }
    );
  };

  return (
    <span
      className={`${
        isDarkTheme ? "pi pi-sun" : "pi pi-moon"
      } rounded-lg p-2 hover:bg-surface-hover border border-surface-border`}
      onClick={toggleTheme}
    />
  );
}
