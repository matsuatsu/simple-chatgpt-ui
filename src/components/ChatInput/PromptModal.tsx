import {
  Box,
  Grid,
  IconButton,
  Modal,
  Divider,
  Typography,
} from "@mui/material";
import { MdAddCircle } from "react-icons/md";
import { PromptInterface } from "../../types/prompt";
import PromptItem from "./PromptItem";
import { usePromptStore } from "../../stores/prompts";

const PromptModal = ({
  open,
  setOpenPromptModal,
  setMessage,
}: {
  open: boolean;
  setOpenPromptModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const prompts = usePromptStore((state) => state.prompts);
  const setPrompts = usePromptStore((state) => state.setPrompts);

  const promptBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal open={open} onClose={() => setOpenPromptModal(false)}>
      <Box sx={promptBoxStyle}>
        <Typography variant="h6" p={1}>
          Prompt Library
        </Typography>
        <Divider />
        <Grid container p={1}>
          <Grid item md={3}>
            Name
          </Grid>
          <Grid item md={7}>
            Prompt
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <Divider />
        <Box sx={{ overflowY: "auto", height: "400px", maxHeight: "400px" }}>
          {prompts.map((p, index) => {
            return (
              <>
                <PromptItem
                  promptIndex={index}
                  setMessage={setMessage}
                  setOpenPromptModal={setOpenPromptModal}
                ></PromptItem>
                <Divider />
              </>
            );
          })}
        </Box>
        <Box display={"flex"} justifyContent={"center"} p={1}>
          <IconButton
            onClick={() => {
              const newPrompt: PromptInterface = {
                name: "",
                prompt: "",
              };
              setPrompts([...prompts, newPrompt]);
            }}
          >
            <MdAddCircle></MdAddCircle>
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default PromptModal;
