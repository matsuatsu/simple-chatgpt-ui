import { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { Box, TextField, Button } from "@mui/material";
import { createUserMessage, useMessageStore } from "../stores/message";
import { useOpenaiConfigStore } from "../stores/openaiConfig";

const ChatInput = () => {
  const openaiConfig = useOpenaiConfigStore((state) => state.openaiConfig);

  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const getAssistantMessage = useMessageStore(
    (state) => state.getAssistantMessage
  );

  const sendMessage = () => {
    if (message.trim().length == 0) return false;
    const newMessage = createUserMessage(message);
    setMessages([...messages, newMessage]);
    getAssistantMessage(openaiConfig);
    setMessage("");
  };

  const regenerateResponse = () => {
    setMessages([...messages.slice(0, message.length - 1)]);
    getAssistantMessage(openaiConfig);
  };

  useEffect(() => {
    const lastIndex = messages.length - 1;
    const flag = messages[lastIndex]?.isLoading ? true : false;
    setDisabled(flag);
  }, [messages]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "md",
        display: "flex",
        justifyContent: "center",
        boxShadow: 5,
      }}
    >
      {messages[messages.length - 1]?.isError ? (
        <Button
          variant="contained"
          onClick={regenerateResponse}
          sx={{ margin: 2 }}
        >
          Regenerate response
        </Button>
      ) : (
        <>
          <TextField
            maxRows={10}
            multiline
            value={message}
            disabled={disabled}
            placeholder="Ctrl+Enter to send"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                sendMessage();
              }
            }}
            sx={{
              width: "100%",
              padding: "10px 0 10px 10px",
              flexGrow: 1,
            }}
            inputRef={(input) => input?.focus()}
          ></TextField>
          <Button
            title="send"
            disabled={disabled}
            onClick={sendMessage}
            color="inherit"
            variant="contained"
            sx={{ margin: "10px 10px 10px 5px", boxShadow: 0 }}
          >
            <MdSend size={20} />
          </Button>
        </>
      )}
    </Box>
  );
};

export default ChatInput;
