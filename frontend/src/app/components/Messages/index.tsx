import { socket } from "@/app/services/socket";
import { theme } from "@/app/theme";
import { Box } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import { MessageBox } from "react-chat-elements";

type Props = {
  messages: any[];
  setMessages: any;
  seletChat: string;
};

export const Messages = ({ messages, setMessages, seletChat }: Props) => {
  useEffect(() => {
    socket.emit("message", {
      chatId: seletChat,
      userId: getCookie("id") as string,
    });
    socket.on("message", (data: any) => {
      setMessages(data.mensagems);
    });
    return () => {
      socket.off("message");
    };
  }, [seletChat, setMessages]);

  const boxRef = useRef<any>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
    socket.emit("message", {
      chatId: seletChat,
      userId: getCookie("id") as string,
    });
  }, [messages, seletChat]);

  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          height: "450px",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ maxHeight: "calc(100% - 56px)", overflowY: "auto" }}>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              position={
                message.user.id === (getCookie("id") as string)
                  ? "right"
                  : "left"
              }
              titleColor={theme.palette.primary.main}
              type={"text"}
              focus
              status={message.status === "unread" ? "received" : "read"}
              forwarded={false}
              id={message.id}
              notch
              removeButton={false}
              replyButton={false}
              retracted={false}
              title={message.user.name}
              text={message.text}
              date={new Date()}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
