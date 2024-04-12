import React from "react";
import { Avatar, Badge, List, ListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../api/hooks/redux";
import Typography from "@mui/material/Typography";
import { chatListItem } from "../../Types/Chat";

type ChatListProps = {
  chatList: chatListItem[];
};

function ChatListItems({ chatList }: ChatListProps) {
  const params = useParams();
  const myProfile = useAppSelector((state) => state.userProfileReducer.user);
  const navigate = useNavigate();

  return (
    <List className={"chat_list_items"}>
      {chatList.map(
        ({
          id,
          from_user_id,
          from_user,
          to_user,
          last_message,
          unread_messages,
        }) => {
          return (
            <ListItem
              divider={true}
              key={id}
              onClick={() => navigate(`/chat/${id}`)}
              className={params.id && +params.id === +id ? "active" : "item"}
            >
              <Avatar
                src={
                  myProfile.id === from_user_id
                    ? to_user.profile.file_path
                    : from_user.profile.file_path
                }
              />
              <div className={"name_message"}>
                {myProfile.id === from_user_id
                  ? to_user.profile.first_name
                  : from_user.profile.first_name}
                <Typography
                  className={"last_message"}
                  children={last_message}
                />
              </div>
              {unread_messages > 0 ? (
                <Badge
                  badgeContent={unread_messages}
                  color={"secondary"}
                  max={10}
                />
              ) : null}
            </ListItem>
          );
        },
      )}
    </List>
  );
}

export default ChatListItems;
