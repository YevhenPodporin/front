import React from "react";
import { chatListItem } from "../../Types/Chat";
import usersJson from "../../../cypress/fixtures/testUserResponse.json";
import ChatListItems from "./ChatListItems";

describe("<ChatListItems />", () => {
  const mockChatList: chatListItem[] = [];

  it("check empty chat list", () => {
    cy.mount(<ChatListItems chatList={mockChatList} />);
    cy.intercept("GET", process.env.REACT_APP_PUBLIC_URL + "/chat/list", {
      body: [],
    });
    cy.get(".chat_list_items > li").should("not.exist");
  });

  it("show chat list data with 1 element", () => {
    mockChatList.push({
      id: 1,
      from_user_id: 1,
      to_user_id: 2,
      last_message: "last message",
      unread_messages: 1,
      updated_at: new Date().toString(),
      created_at: new Date().toString(),
      to_user: {
        profile: {
          ...usersJson[0],
          user_id: 11111,
          updated_at: new Date().toString(),
          created_at: new Date().toString(),
        },
      },
      from_user: {
        profile: {
          ...usersJson[1],
          user_id: 11111,
          updated_at: new Date().toString(),
          created_at: new Date().toString(),
        },
      },
    });
    cy.mount(<ChatListItems chatList={mockChatList} />);

    cy.get(".chat_list_items");
    cy.get(".chat_list_items > li").should("have.length", 1);
    cy.get(".name_message").should("include.text", usersJson[1].first_name);
    cy.get(".name_message>p").should("include.text", "last message");
    cy.get(".MuiBadge-badge").should("have.text", "1");
  });

  it("show chat list data with many elements", () => {
    for (let i = 0; i < 20; i++) {
      mockChatList.push({
        id: i,
        from_user_id: i,
        to_user_id: i + 1,
        last_message: "last message" + (i + 1),
        unread_messages: Math.floor(Math.random() * 10),
        updated_at: new Date().toString(),
        created_at: new Date().toString(),
        to_user: {
          profile: {
            ...usersJson[0],
            user_id: 11111,
            updated_at: new Date().toString(),
            created_at: new Date().toString(),
          },
        },
        from_user: {
          profile: {
            id: i + 1,
            first_name: "Test" + i + 1,
            date_of_birth: "",
            is_online: true,
            last_name: "Testovich",
            user_id: 11111,
            updated_at: new Date().toString(),
            created_at: new Date().toString(),
          },
        },
      });
    }
    cy.mount(<ChatListItems chatList={mockChatList} />);

    cy.get(".chat_list_items");
    cy.get(".chat_list_items > li").should("have.length", mockChatList.length);
    // Проверяем, что для каждого элемента массива есть соответствующий элемент в UI
    mockChatList.forEach((chatItem, index) => {
      cy.get(".chat_list_items > li")
        .eq(index)
        .within(() => {
          cy.get(".name_message").should(
            "include.text",
            chatItem.from_user.profile.first_name,
          );
          cy.get(".name_message>p").should(
            "include.text",
            chatItem.last_message,
          );
          if (chatItem.unread_messages === 0) {
            cy.get(".MuiBadge-badge").should("not.exist");
          } else {
            cy.get(".MuiBadge-badge").should(
              "have.text",
              chatItem.unread_messages.toString(),
            );
          }
        });
    });
  });
});
