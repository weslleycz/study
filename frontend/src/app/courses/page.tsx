"use client";

import { Container, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { CardCourse } from "../components/CardCourse";

export const Courses = () => {
  const [allCourses, setAllCourses] = useState([
    {
      name: "Python & MySQL",
      id: "1",
      user: {
        name: "teste",
      },
      durationInSeconds:1555
    },
    {
      name: "Curso de JavaScript e TypeScript",
      id: "2",
      user: {
        name: "teste",
      },
      durationInSeconds:1555
    },
    {
      name: "Curso de Python 3",
      id: "3",
      user: {
        name: "teste",
      },
      durationInSeconds:1555
    },
  ]);

  return (
    <>
      <Container sx={{ marginTop: 1 }} maxWidth="lg">
        <Typography sx={{ fontWeight: 800 }} variant="h4" gutterBottom>
          Cursos
        </Typography>
        <Grid container spacing={2}>
          {allCourses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={6} lg={6}>
              <CardCourse {...course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Courses;
