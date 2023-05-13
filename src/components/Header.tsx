import { Box, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { MdRefresh } from "react-icons/md";
import { useMessageStore } from "../stores/message";

const Header = () => {
  const setMessages = useMessageStore((state) => state.setMessages);

  const resetChat = () => {
    setMessages([]);
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
          onClick={() => resetChat()}
        >
          <MdRefresh />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
