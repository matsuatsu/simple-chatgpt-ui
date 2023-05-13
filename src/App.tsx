import ChatContent from "./components/ChatContent";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";

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

  const MainBox = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    maxWidth: theme.breakpoints.values.md,
    margin: "auto",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: theme.palette.grey[50],
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainBox>
        <Header />
        <ChatContent />
        <ChatInput />
      </MainBox>
    </ThemeProvider>
  );
}

export default App;
