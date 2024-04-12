import React from "react";
import UserProfilePopup from "./UserProfilePopup";

describe("<UserProfilePopup />", () => {
  beforeEach(() => cy.mount(<UserProfilePopup />));

  it("check exists elements", () => {
    cy.get(".content_wrapper");
    cy.get("form");
    cy.get("#first_name");
    cy.get("#last_name");
    cy.get("div.date-picker.date_of_birth");
    cy.get("h2").should("have.text", "Edit profile");
    cy.get("#email");
    cy.get("button[type=submit]").should("have.text", "Save changes");
    cy.get("button[type=button]");
  });

  it("click to image edit", () => {
    const image = cy.get("div.avatar_wrapper");
    image.trigger("focus", 5, 5, { force: true });
  });
});
