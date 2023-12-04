import { Accordion, Box, Container, Grid, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { Lesson } from "../Lesson";
import { Section } from "../Section";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VideoPlayer = dynamic(() => import("@/app/components/VideoPlayer"), {
  ssr: false,
});

export const Lessons = () => {
  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={5}>
          <Grid item xs={7}>
            <VideoPlayer />
            <Box  p={1} sx={{ overflow: "auto", height: "280px",  }}>
              <Typography sx={{ fontWeight: 800 }} variant="h6" gutterBottom>
                Explorando os Fundamentos Essenciais do Java
              </Typography>
              <Typography variant="body2" gutterBottom>
                esta empolgante aula de Java, mergulharemos nos fundamentos
                essenciais dessa poderosa linguagem de programação. Projetada
                especialmente para iniciantes, esta jornada de aprendizado
                abordará conceitos fundamentais, estrutura de programação e
                proporcionará uma compreensão sólida do ambiente Java. Ao longo
                da aula, os participantes terão a oportunidade de explorar
                práticas recomendadas, resolver desafios práticos e desenvolver
                uma base sólida para construir aplicações Java robustas.
                Prepare-se para uma imersão envolvente no universo da
                programação Java!
              </Typography>

            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: 800 }} variant="h6" gutterBottom>
              Curso de java
            </Typography>
            <Box sx={{ overflow: "auto", height: "550px" }}>
              <Section />
              <Section />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
