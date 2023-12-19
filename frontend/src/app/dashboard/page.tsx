"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { theme } from "../theme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: theme.palette.primary.main,
      backgroundColor: "rgb(255, 255, 255)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(235, 53, 53)",
      backgroundColor: "rgb(255, 255, 255)",
    },
  ],
};

const Dashboard = () => {
  const cursos = [
    { nome: "HTML/CSS", duracao: "4 semanas", students: 20 },
    { nome: "HTML/CSS", duracao: "4 semanas", students: 20 },
    { nome: "HTML/CSS", duracao: "4 semanas", students: 20 },
    { nome: "HTML/CSS", duracao: "4 semanas", students: 20 },
  ];
  return (
    <>
      <Container>
        <Box p={1}>
          <Typography sx={{ fontWeight: 800 }} variant="h5" gutterBottom>
            Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Line options={options} data={data} />
              <Box marginTop={4}>
                <Typography color={"grey"} gutterBottom>
                  Cursos
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Duração</TableCell>
                        <TableCell>Alunos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cursos.map((curso, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: 800,
                            }}
                          >
                            {curso.nome}
                          </TableCell>
                          <TableCell>{curso.duracao}</TableCell>
                          <TableCell sx={{ color: theme.palette.primary.main }}>
                            <Chip color="info" label={curso.students} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={4}>
              2
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
