import React, { useState } from "react";
import {
  Alert,
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { MessageInterface } from "../../types/message";
import ChatIcon from "./ChatIcon";
import CopyButton from "./CopyButton";
import { MdEdit } from "react-icons/md";
import MarkdownViewer from "./MarkdownViewer";
import EditBox from "./EditBox";
import { grey } from "@mui/material/colors";

const renderMessage = (message: MessageInterface) => {
  if (message.isError) {
    return (
      <Alert severity="error" sx={{ margin: 1 }}>
        {message.content}
      </Alert>
    );
  } else if (message.isLoading) {
    return (
      <>
        <LinearProgress color="inherit" sx={{ margin: "16px 0" }} />
        <Alert severity="info" sx={{ margin: 1 }}>
          {message.content}
        </Alert>
      </>
    );
  } else {
    if (message.role == "user") {
      return (
        <Box
          whiteSpace={"break-spaces"}
          sx={{ margin: "16px 0", wordBreak: "break-word" }}
        >
          {message.content}
        </Box>
      );
    } else {
      return (
        <Box sx={{ wordBreak: "break-word" }}>
          <MarkdownViewer content={message.content}></MarkdownViewer>
          {message.totalTokens && (
            <Typography align="right" variant="body2" color={grey[600]}>
              {message.totalTokens} tokens
            </Typography>
          )}
        </Box>
      );
    }
  }
};

interface Props {
  message: MessageInterface;
  index: number;
}

const ChatMessage: React.FC<Props> = ({ message, index }) => {
  const [isEditting, setIsEditting] = useState(false);

  return (
    <Box bgcolor={message.role == "user" ? grey[50] : grey[200]}>
      <Box display={"flex"} flexDirection={"row"}>
        <Box minWidth={"50px"} margin={"16px 0"}>
          <ChatIcon role={message.role} />
        </Box>
        <Box minWidth={0} flexGrow={1}>
          <Box
            sx={{
              margin: "0 10px",
              position: "relative",
            }}
          >
            {isEditting ? (
              <EditBox
                content={message.content}
                messageIndex={index}
                setIsEdittingFalse={() => setIsEditting(false)}
              ></EditBox>
            ) : (
              renderMessage(message)
            )}
          </Box>
        </Box>
        <Box minWidth={"40px"} margin={"16px 0"}>
          {message.role == "assistant" &&
            !message.isLoading &&
            !message.isError && (
              <CopyButton
                onClick={() => navigator.clipboard.writeText(message.content)}
                color={grey[500]}
              />
            )}
          {message.role == "user" && !message.isLoading && !isEditting && (
            <IconButton
              size="small"
              sx={{ color: grey[500] }}
              onClick={() => {
                setIsEditting(true);
              }}
            >
              <MdEdit></MdEdit>
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default ChatMessage;
