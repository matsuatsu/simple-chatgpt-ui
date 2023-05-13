import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useMessageStore } from "../stores/message";
import ChatMessage from "./ChatMessage";
import ConfigBox from "./ConfigBox";
import { styled } from "@mui/material/styles";

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
  );
};

export default ChatContent;
