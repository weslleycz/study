"use client";

import { faker } from "@faker-js/faker";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Line } from "react-chartjs-2";
import { CommentsDashboard } from "../components/CommentsDashboard";
import { theme } from "../theme";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Graphic } from "../components/Graphic";



const Page = () => {
  const [cursos, setCursos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await api.get(`/course/byId/teacher/${getCookie("id")}`, {
        headers: {
          token: getCookie("token"),
        },
      });
      setCursos(res.data);
    })();
  }, []);

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
                  <Link href={"/dashboard/curso"}>
                    <Button variant="contained">Criar curso</Button>
                  </Link>
                </Box>
                <Paper elevation={24}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>Nome</TableCell>
                          <TableCell>Aulas</TableCell>
                          <TableCell>Alunos</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cursos.map((curso, index) => (
                          <>
                            <TableRow
                              onClick={() =>
                                router.push(
                                  `/dashboard/curso/${curso.id}`
                                )
                              }
                              sx={{
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                ":hover": {
                                  backgroundColor: "CaptionText",
                                },
                              }}
                              key={index}
                            >
                              <TableCell>
                                <Brightness1Icon
                                  sx={{ color: curso.primary }}
                                />
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 800,
                                }}
                              >
                                {curso.name}
                              </TableCell>
                              <TableCell>{curso.lessons.length}</TableCell>
                              <TableCell
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <Chip
                                  color="info"
                                  label={curso.Enrollment.length}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
              <Graphic />
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

export default Page;
