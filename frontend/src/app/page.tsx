"use client";
import { Container } from "@mui/material";
import { Lessons } from "./components/Lessons";
import { Hero } from "./components/Hero";
import { Secao24 } from "./components/Secao24";
import { Multiplataforma } from "./components/Multiplataforma";

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        {/* <Lessons /> */}
        <Hero />
        <Secao24/>
        <Multiplataforma/>
      </Container>
    </>
  );
}
