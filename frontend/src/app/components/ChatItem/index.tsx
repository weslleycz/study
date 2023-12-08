import { theme } from "@/app/theme";
import { Avatar, Badge, Box, Paper, Stack, Typography } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { getCookie } from "cookies-next";

type Props = {
  id: string;
  status: string;
  name: string;
  mensagems: any[];
  setSeletChat: any;
  userId: string;
};
//userId: "unread" getCookie("id") as string
export const ChatItem = ({
  id,
  status,
  name,
  mensagems,
  userId,
  setSeletChat,
}: Props) => {
  return (
    <>
      <Paper
        onClick={() => setSeletChat(id)}
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: "#ffffff",
          cursor: "pointer",
          marginTop: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              background: theme.palette.info.main,
              marginRight: 0.2,
            }}
            alt={name}
            src={process.env.API_Url + `/users/avatar/${userId}`}
          />
          <Brightness1Icon
            sx={{
              color: status == "Online" ? "#2CCA37" : "#E2E2E2",
              fontSize: 13,
            }}
          />
          <Box p={2}>
            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {mensagems.length != 0 ? (
                    <>{mensagems[mensagems.length - 1].text}</>
                  ) : (
                    <></>
                  )}
                </Typography>
              </Box>
              <Badge
                color="secondary"
                badgeContent={
                  mensagems.filter((mensagem: any) => {
                    return (
                      mensagem.status === "unread" &&
                      mensagem.userId !== (getCookie("id") as string)
                    );
                  }).length
                }
              />
            </Stack>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
