import ChatContent from "./components/ChatContent";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: blueGrey[500],
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          ::-webkit-scrollbar{
              width: 6px;
              height: 6px;
          },
          ::-webkit-scrollbar-thumb {
              background-color: grey;
              border-radius: 10px;
          }
          `,
      },
    },
  });

  const RootBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: theme.palette.grey[400],
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootBox>
        <ChatContent />
      </RootBox>
    </ThemeProvider>
  );
}

export default App;
