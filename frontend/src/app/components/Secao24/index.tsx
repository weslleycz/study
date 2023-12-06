import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";

export const Secao24 = () => {
  return (
    <>
      <Box className={styles.content} marginTop={10} marginBottom={2}>
        <Typography
          className={styles.title}
          sx={{ fontWeight: 800 }}
          variant="h4"
          gutterBottom
        >
          Acesso Flexível a Qualquer Momento
        </Typography>
        <Image
          className={styles.imagem}
          alt=""
          src={"calendario.svg"}
          width={100}
          height={100}
        />
        <Box className={styles.subtitle}>
          A sua educação deve se adaptar ao seu ritmo de vida. Com a nossa
          plataforma, você tem a liberdade de assistir às aulas quando for mais
          conveniente para você. Não importa se você é um estudante em tempo
          integral, trabalhador em período integral ou tem um horário
          imprevisível, as aulas estão disponíveis 24 horas por dia, 7 dias por
          semana. Assuma o controle do seu tempo de estudo e mergulhe no
          conhecimento sempre que precisar. Oferecemos a flexibilidade que você
          merece para alcançar seus objetivos acadêmicos.
        </Box>
      </Box>
    </>
  );
};
