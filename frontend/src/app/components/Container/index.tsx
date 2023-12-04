"use client";
import { theme } from "@/app/theme";
import { Box, ThemeProvider, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
