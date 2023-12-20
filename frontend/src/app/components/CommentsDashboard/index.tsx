import { Box, Divider, Paper, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const CommentsDashboard = () => {
  return (
    <>
      <Paper sx={{ height: "100%" }} elevation={24}>
        <Box alignItems={"center"} display={"flex"} p={1.5}>
          {" "}
          <ChatBubbleOutlineIcon color="primary" />
          <Typography sx={{ fontWeight: 800, marginLeft:1 }}  gutterBottom>
            Comentários
          </Typography>
        </Box>
        <Divider />
      </Paper>
    </>
  );
};
