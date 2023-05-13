import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Box, Card, Typography } from "@mui/material";
import CopyButton from "./CopyButton";

const CodeBlock = ({
  inline,
  language,
  children,
}: {
  inline: boolean;
  language: string;
  children: string;
}) => {
  return inline ? (
    <Card
      style={{
        display: "inline",
        padding: "2px 2px",
        margin: "0 2px",
        backgroundColor: "#4b4b59",
        color: "white",
      }}
      variant="outlined"
    >
      <code>{children}</code>
    </Card>
  ) : (
    <Box>
      <Box
        sx={{
          bgcolor: "#4b4b59",
          color: "white",
          display: "flex",
          alignItems: "center",
          borderRadius: "6px 6px 0 0",
        }}
      >
        <Box component="span" sx={{ paddingLeft: "10px" }}>
          <Typography variant="body2">{language}</Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <CopyButton onClick={() => navigator.clipboard.writeText(children)} />
        </Box>
      </Box>
      <SyntaxHighlighter
        language={language ? language : "javascript"}
        style={vscDarkPlus}
        customStyle={{
          marginTop: 0,
          borderRadius: "0 0 6px 6px",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock;
