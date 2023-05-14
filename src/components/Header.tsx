import { Box, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { MdRefresh, MdDownload } from "react-icons/md";
import { useMessageStore } from "../stores/message";

const Header = () => {
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);

  const resetChat = () => {
    setMessages([]);
  };

  const download = () => {
    const fileContent = messages
      .map((x) => `### ${x.role}:\n\n${x.content}`)
      .join("\n\n---\n\n");
    const file = new Blob([fileContent], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = Date.now() + ".md";
    element.click();
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6">Simple ChatGPT UI</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={() => download()}
        >
          <MdDownload />
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={() => resetChat()}
        >
          <MdRefresh />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
