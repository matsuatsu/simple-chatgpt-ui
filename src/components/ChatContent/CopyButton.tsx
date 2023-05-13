import { IconButton } from "@mui/material";
import { useState } from "react";
import { MdContentCopy, MdCheck } from "react-icons/md";

const CopyButton = ({
  onClick,
  color = "white",
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <IconButton
      size="small"
      onClick={(e) => {
        onClick(e);
        setIsCopied(true);
        window.setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }}
      sx={{ color: color }}
    >
      {isCopied ? <MdCheck /> : <MdContentCopy />}
    </IconButton>
  );
};

export default CopyButton;
