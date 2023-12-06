import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";

export const Hero = () => {
  return (
    <Box className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography className={styles.tile} variant="h4">
            Transforme seu Futuro com Educação de Qualidade
          </Typography>
          <Typography variant="subtitle1">
            Descubra uma educação superior sem fronteiras. Nossos cursos EAD
            para faculdades oferecem uma jornada de aprendizado envolvente,
            combinando qualidade acadêmica e flexibilidade. Explore disciplinas
            inovadoras, guiadas por professores especializados, e transforme seu
            caminho educacional. No centro da nossa plataforma, você encontra a
            chave para desbloquear um futuro repleto de oportunidades e
            conquistas.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Image
            className={styles.heroImage}
            alt="Hero Image"
            width={100}
            height={100}
            src={"heroimg.svg"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
