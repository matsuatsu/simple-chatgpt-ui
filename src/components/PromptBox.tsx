import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Modal,
  Divider,
  TextField,
} from "@mui/material";
import {
  MdAddCircle,
  MdEdit,
  MdDelete,
  MdCheck,
  MdClear,
  MdClose,
  MdContentPasteGo,
} from "react-icons/md";
import { PromptInterface } from "../types/prompt";
import { useState } from "react";
import styled from "@emotion/styled";

const PromptBox = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [prompts, setPrompts] = useState<PromptInterface[]>([]);
  const [isConfirm, setIsConfirm] = useState(false);

  const promptBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const PromptItemBox = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: 2,
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      cursor: "pointer",
    },
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={promptBoxStyle}>
        <Box display={"flex"} p={1}>
          <Box flexGrow={1}>name</Box>
          <Box flexGrow={5}>prompt</Box>
        </Box>
        <Divider />
        <Box sx={{ overflowY: "auto", height: "400px", maxHeight: "400px" }}>
          {prompts.map((p) => {
            return (
              <>
                <PromptItemBox>
                  <Box flexGrow={1} p={1}>
                    {isConfirm ? (
                      <TextField value={p.name} size={"small"} fullWidth />
                    ) : (
                      p.name
                    )}
                  </Box>
                  <Box flexGrow={1} p={1}>
                    {isConfirm ? (
                      <TextField value={p.prompt} size={"small"} fullWidth />
                    ) : (
                      p.prompt
                    )}
                  </Box>
                  {isConfirm ? (
                    <>
                      <IconButton
                        onClick={() => {
                          setIsConfirm(false);
                        }}
                      >
                        <MdCheck />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setIsConfirm(false);
                        }}
                      >
                        <MdClose />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={onClose}>
                        <MdContentPasteGo />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setIsConfirm(true);
                        }}
                      >
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setIsConfirm(true);
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </>
                  )}
                </PromptItemBox>
                <Divider />
              </>
            );
          })}
        </Box>
        <Box display={"flex"} justifyContent={"center"} p={1}>
          <IconButton
            onClick={() => {
              const newPrompt: PromptInterface = {
                name: "empty",
                prompt: "empty",
              };
              setPrompts((prev) => [...prev, newPrompt]);
            }}
          >
            <MdAddCircle></MdAddCircle>
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default PromptBox;
