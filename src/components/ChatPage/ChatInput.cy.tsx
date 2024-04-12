import React from "react";
import ChatInput from "./ChatInput";

describe("<ChatInput />", () => {
  const getMainInput = () => cy.get("#chat_main_input");
  const onInput = () => {};
  const onSubmit = (value: any) => {
    return value;
  };

  it("check elements", () => {
    // @ts-ignore
    cy.mount(<ChatInput onInput={onInput} submitHandler={onSubmit} />);
    cy.get(".input_wrapper");
    cy.get(".MuiInputBase-root");
    getMainInput()
      .should("have.attr", "placeholder")
      .should("have.length.above", 0);
    cy.get('[data-testid="KeyboardVoiceIcon"]')
    cy.get("input[type=file]");
    cy.get("button[type=submit]");

    getMainInput().type("Test text").should("have.text", "Test text");
    cy.get('[data-testid="SendTwoToneIcon"]')
  });
});
