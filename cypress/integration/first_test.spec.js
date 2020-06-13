/// <reference types="Cypress" />

describe("it works!", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("starts", () => {
    cy.get(["data-test=heading"]);
  });
  it("i can visit annother page", () => {
    cy.visit("/tvepisodes");
  });
});
