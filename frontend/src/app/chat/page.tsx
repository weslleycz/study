"use client";

import { theme } from "@/app/theme";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { api } from "../services/api";
import { getCookie } from "cookies-next";
import { ChatItem } from "../components/ChatItem";

const Chat = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.API_Url}/chat/${getCookie("id") as string}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats(data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Grid container spacing={0} sx={{ height: "82vh" }}>
      {/* Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper
          elevation={1}
          sx={{ height: "100%", p: 2, backgroundColor: "#F0F0F0" }}
        >
          {chats.map((chat: any) => (
            <>
              {chat.users.map((user: any) =>
                user.id != (getCookie("id") as string) ? (
                  <>
                    <ChatItem
                      mensagems={chat.mensagems}
                      name={user.name}
                      status={user.status}
                      id={user.id}
                    />
                  </>
                ) : null
              )}
            </>
          ))}
        </Paper>
      </Grid>

      {/* Main Chat Area */}
      <Grid item xs={12} md={9}>
        <Paper elevation={1} sx={{ height: "100%", p: 2 }}>
          {/* Chat Messages */}
          <Box sx={{ maxHeight: "calc(100% - 56px)", overflowY: "auto" }}>
            <MessageBox
              position={"right"}
              titleColor={theme.palette.primary.main}
              type={"text"}
              focus
              status="read"
              forwarded={false}
              id={"1"}
              notch
              removeButton={false}
              replyButton={false}
              retracted={false}
              title={"Francisco Wesley"}
              text="Here is a text type message box"
              date={new Date()}
            />
          </Box>

          <Box
            sx={{
              bottom: 25,
              width: "70%",
              position: "fixed",
            }}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                sx={{ width: "100%" }}
                label="Digite sua mensagem"
                variant="outlined"
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="primary" aria-label="send">
                  <SendIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
