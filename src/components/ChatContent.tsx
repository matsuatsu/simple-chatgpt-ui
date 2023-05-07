import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatInput from "./ChatInput";
import { useMessageStore } from "../stores/message";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ConfigBox from "./ConfigBox";
import { styled } from "@mui/material/styles";

const ChatBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxWidth: theme.breakpoints.values.md,
  margin: "auto",
  display: "flex",
  flexFlow: "column",
  justifyContent: "flex-end",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[50],
}));

const MessageTopMargin = styled(Box)(() => ({ height: "15px" }));
const MessageBottomMargin = styled(Box)(() => ({ height: "50px" }));

const ChatContent = () => {
  const messages = useMessageStore((state) => state.messages);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      block: "start",
    });
  }, [messages]);

  return (
    <ChatBox>
      <ChatHeader />
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.length ? (
          <>
            <MessageTopMargin />
            {messages.map((message, index) => {
              const isLastUserMessage = index == messages.length - 1;
              return (
                <Box key={`${message.id}-${index}`}>
                  {isLastUserMessage && <Box ref={scrollRef}></Box>}
                  {<ChatMessage message={message} index={index} />}
                </Box>
              );
            })}
            <MessageBottomMargin />
          </>
        ) : (
          <ConfigBox></ConfigBox>
        )}
      </Box>
      <ChatInput />
    </ChatBox>
  );
};

export default ChatContent;
