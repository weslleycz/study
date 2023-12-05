"use client";
import { Container } from "@mui/material";
import { Lessons } from "./components/Lessons";

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <Lessons />
      </Container>
    </>
  );
}
