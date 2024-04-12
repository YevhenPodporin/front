import ChatList from "../components/ChatPage/ChatList";
import "../assets/styles/ChatPage.scss";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import Box from "@mui/material/Box";

function Chat() {
  return (
    <div className={"chat_wrapper"}>
      <ChatList />
      <Box
        textAlign={"center"}
        fontWeight={"bold"}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
        flex={"1 1 auto"}
        fontSize={24}
      >
        <ArrowRightAltTwoToneIcon className={"arrow_to_left"} /> Choose the chat
        from list
      </Box>
    </div>
  );
}

export default Chat;
