"use client";
import { theme } from "@/app/theme";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider, QueryKey } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 10, //  10 minutos
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: sessionStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {children}
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};
