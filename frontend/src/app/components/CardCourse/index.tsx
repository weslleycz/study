import { Paper, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { theme } from "../../theme";

type Props = {
  name: string;
  id: string;
  user: {
    name: string;
  };
  durationInSeconds: number;
};

export const CardCourse = ({ name, user, durationInSeconds }: Props) => {
  // Função para converter segundos em horas
  const convertSecondsToHours = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  const durationInHours = convertSecondsToHours(durationInSeconds);

  return (
    <>
      <Paper sx={{ p: 6 }}>
        <Typography
          sx={{ fontWeight: 600 }}
          color={theme.palette.primary.main}
          variant="h6"
          gutterBottom
        >
          {name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <AccessTimeIcon sx={{ color: "#5f5e5e" }} />
          <Typography color={"#5f5e5e"} variant="subtitle1" gutterBottom>
            {durationInHours}
          </Typography>
        </Stack>
        <Typography
          color={theme.palette.primary.main}
          variant="subtitle1"
          gutterBottom
        >
          {user.name}
        </Typography>
      </Paper>
    </>
  );
};
