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
  Button,
  Divider,
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
import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CommentsDashboard } from "../components/CommentsDashboard";

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
      text: "Vendas nos últimos 6 meses.",
    },
  },
};

const labels = Array.from({ length: 6 }, (_, index) => {
  const date = addMonths(new Date(), -index);
  return format(date, "MMMM", { locale: ptBR });
}).reverse();

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: theme.palette.info.main,
      backgroundColor: theme.palette.primary.main,
      fill: true,
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
              <Box marginTop={4} marginBottom={1}>
                <Box
                  marginBottom={2}
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Typography color={"grey"} gutterBottom>
                    Cursos
                  </Typography>
                  <Button variant="contained">Criar curso</Button>
                </Box>
                <Paper elevation={24}>
                  <TableContainer>
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
                            <TableCell
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <Chip color="info" label={curso.students} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
              <Paper elevation={24}>
                <Line options={options} data={data} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <CommentsDashboard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
