import { MdPerson, MdComputer } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { Role } from "../types/message";
import { grey } from "@mui/material/colors";

const ChatIcon = ({ role }: { role: Role }) => {
  const iconStyle: React.CSSProperties = {
    height: "22px",
    width: "100%",
    color: grey[700],
  };
  if (role == "user") {
    return <MdPerson style={iconStyle} />;
  } else if (role == "assistant") {
    return <FaRobot style={iconStyle} />;
  } else {
    return <MdComputer style={iconStyle} />;
  }
};

export default ChatIcon;
