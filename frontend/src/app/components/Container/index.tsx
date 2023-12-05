"use client";
import { theme } from "@/app/theme";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <>
       <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
    </>
  );
};
