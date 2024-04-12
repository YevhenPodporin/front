import React, { useEffect, useState } from "react";
import { Avatar, Badge, CircularProgress, List, ListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { chatSlice } from "../../store/redusers/ChatSlice";
import { useAppDispatch, useAppSelector } from "../../api/hooks/redux";
import { useGetChatListQuery } from "../../store/services/ChatService";
import Typography from "@mui/material/Typography";
import UseWindowSize from "../../Hooks/useWindowSize";
import ChatListItems from "./ChatListItems";

function ChatList() {
  const [isShow, setIsShow] = useState<boolean>(true);
  const windowSize = UseWindowSize();
  const chatList = useAppSelector((state) => state.chatSlice.data);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetChatListQuery();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(chatSlice.actions.setChatList(data));
    }
  }, [isLoading]);

  useEffect(() => {
    if (windowSize.width !== 0) {
      if (windowSize.width <= 992 && !isMobile) {
        setIsMobile(true);
      } else if (windowSize.width > 992 && isMobile) {
        setIsMobile(false);
      }
    }
  }, [windowSize]);

  return (
    <div
      className={
        isMobile && isShow ? "chat_list_wrapper hide" : "chat_list_wrapper"
      }
    >
      {isLoading ? (
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "40%" }} />
      ) : (
        <ChatListItems chatList={chatList} />
      )}
      {/*<div className={'arrow_icon'} onClick={()=>setIsShow(false)}>{<ArrowBackIosNewTwoToneIcon/>}</div>*/}
    </div>
  );
}

export default ChatList;
