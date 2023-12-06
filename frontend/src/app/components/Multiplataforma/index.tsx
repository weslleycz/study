import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";

export const Multiplataforma = () => {
  return (
    <>
      <Box className={styles.content} marginTop={5} marginBottom={2}>
        <Typography
          className={styles.title}
          sx={{ fontWeight: 800 }}
          variant="h4"
          gutterBottom
        >
          Acesse de Qualquer Lugar, a Qualquer Hora
        </Typography>
        <Image
          className={styles.imagem}
          alt=""
          src={"celular.svg"}
          width={100}
          height={100}
        />
        <Box className={styles.subtitle}>
          A sua jornada de aprendizado não deve ter limites. Nossa plataforma
          oferece total flexibilidade, permitindo que você acesse os cursos a
          partir do seu computador, smartphone ou tablet. Seja no conforto da
          sua casa, durante o intervalo do trabalho ou em movimento, sua
          educação está sempre ao seu alcance. Compatibilidade total com
          dispositivos, garantindo uma experiência de aprendizado consistente e
          sem complicações em qualquer plataforma. Desfrute da liberdade de
          aprender onde quiser, quando quiser.
        </Box>
      </Box>
    </>
  );
};
