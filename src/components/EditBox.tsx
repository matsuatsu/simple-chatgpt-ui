import { useState } from "react";
import { createUserMessage, useMessageStore } from "../stores/message";
import { Box, Button, TextField } from "@mui/material";
import { useOpenaiConfigStore } from "../stores/openaiConfig";

const EditBox = ({
  content,
  messageIndex,
  setIsEdittingFalse,
}: {
  content: string;
  messageIndex: number;
  setIsEdittingFalse: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const openaiConfig = useOpenaiConfigStore((state) => state.openaiConfig);

  const [_content, _setContent] = useState<string>(content);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const getAssistantMessage = useMessageStore(
    (state) => state.getAssistantMessage
  );
  const submit = (content: string) => {
    let newMessages = [...messages.slice(0, messageIndex)];
    const newMessage = createUserMessage(content);
    newMessages[messageIndex] = newMessage;
    setMessages(newMessages);
    getAssistantMessage(openaiConfig);
    setIsEdittingFalse;
  };

  return (
    <Box width={"100%"} paddingTop={2}>
      <TextField
        fullWidth
        multiline
        value={_content}
        onChange={(e) => _setContent(e.target.value)}
      ></TextField>
      <Box display={"flex"}>
        <Box flexGrow={1}></Box>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            submit(_content);
          }}
          sx={{ boxShadow: 0, margin: 1 }}
        >
          submit
        </Button>
        <Button color="inherit" onClick={setIsEdittingFalse} sx={{ margin: 1 }}>
          cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditBox;
