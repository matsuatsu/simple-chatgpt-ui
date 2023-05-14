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
import { usePromptStore } from "../../stores/prompt";

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
    height: "60%",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpenPromptModal(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={promptBoxStyle}>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
          flexDirection={"column"}
        >
          <Typography variant="h6" p={1}>
            Prompt Library
          </Typography>
          <Divider />
          <Grid container p={1}>
            <Grid item xs={3}>
              Name
            </Grid>
            <Grid item xs={7}>
              Prompt
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Divider />
          <Box
            sx={{
              overflowY: "auto",
              flexGrow: 1,
            }}
          >
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
      </Box>
    </Modal>
  );
};

export default PromptModal;
