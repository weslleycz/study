"use client";

import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, IconButton, Paper, Stack, TextField } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "../components/ChatItem";
import { Messages } from "../components/Messages";
import { socket } from "../services/socket";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [seletChat, setSeletChat] = useState("");

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

  const handleSendMessage = async () => {
    if (message != "") {
      socket.emit("message", {
        message,
        userId: getCookie("id") as string,
        chatId: seletChat,
      });
      setMessage("");
    }
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      if (message != "") {
        await handleSendMessage();
      }
    }
  };

  return (
    <Grid container spacing={0} sx={{ height: "82vh" }}>
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
                      setSeletChat={setSeletChat}
                      id={chat.id}
                      userId={user.id}
                    />
                  </>
                ) : null
              )}
            </>
          ))}
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper elevation={1} sx={{ height: "100%", p: 2 }}>
          {seletChat !== "" ? (
            <Box>
                <Messages
                  seletChat={seletChat}
                  setMessages={setMessages}
                  messages={messages}
                />
  
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
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => handleSendMessage()}
                      color="primary"
                      aria-label="send"
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Box>
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
