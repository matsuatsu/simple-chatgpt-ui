import { Box, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import {
  MdCheck,
  MdClose,
  MdDelete,
  MdEdit,
  MdContentPasteGo,
} from "react-icons/md";
import { usePromptStore } from "../../stores/prompts";
import { styled } from "@mui/material";

const ConfirmBox = ({
  onClickCheck,
  onClickClose,
}: {
  onClickCheck: () => void;
  onClickClose: () => void;
}) => {
  return (
    <Box>
      <IconButton onClick={onClickCheck}>
        <MdCheck />
      </IconButton>
      <IconButton onClick={onClickClose}>
        <MdClose />
      </IconButton>
    </Box>
  );
};

const PromptGrid = styled(Grid)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const PromptItem = ({
  promptIndex,
  setMessage,
  setOpenPromptModal,
}: {
  promptIndex: number;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenPromptModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const prompts = usePromptStore((state) => state.prompts);
  const setPrompts = usePromptStore((state) => state.setPrompts);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localName, setLocalName] = useState(prompts[promptIndex].name);
  const [localPrompt, setLocalPrompt] = useState(prompts[promptIndex].prompt);

  const updatePrompt = () => {
    const newPrompt = { name: localName, prompt: localPrompt };
    let newPrompts = [...prompts];
    newPrompts[promptIndex] = newPrompt;
    setPrompts(newPrompts);
    console.log(newPrompts);
    setIsEditing(false);
  };

  const deletePrompt = () => {
    let newPrompts = [...prompts];
    newPrompts.splice(promptIndex, 1);
    setPrompts(newPrompts);
    setIsDeleting(false);
  };

  return (
    <PromptGrid container p={1}>
      <Grid item md={3} p={1}>
        {isEditing ? (
          <TextField
            fullWidth
            size={"small"}
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          ></TextField>
        ) : (
          <Box>{localName}</Box>
        )}
      </Grid>
      <Grid item md={7} p={1}>
        {isEditing ? (
          <TextField
            fullWidth
            size={"small"}
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            multiline
          ></TextField>
        ) : (
          <Box>{localPrompt}</Box>
        )}
      </Grid>
      <Grid item md={2} display={"flex"} justifyContent={"end"}>
        {isEditing && (
          <ConfirmBox
            onClickCheck={() => updatePrompt()}
            onClickClose={() => setIsEditing(false)}
          />
        )}
        {isDeleting && (
          <ConfirmBox
            onClickCheck={() => deletePrompt()}
            onClickClose={() => setIsDeleting(false)}
          />
        )}
        {!isEditing && !isDeleting && (
          <Box>
            <IconButton
              onClick={() => {
                setMessage(localPrompt);
                setOpenPromptModal(false);
              }}
            >
              <MdContentPasteGo />
            </IconButton>
            <IconButton onClick={() => setIsEditing(true)}>
              <MdEdit />
            </IconButton>
            <IconButton onClick={() => setIsDeleting(true)}>
              <MdDelete />
            </IconButton>
          </Box>
        )}
      </Grid>
    </PromptGrid>
  );
};

export default PromptItem;
