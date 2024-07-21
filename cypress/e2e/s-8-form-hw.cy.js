import { errorMessages } from "../../src/FormPage";

describe('Register Page', () => {
  describe('Error messages', () =>{
    it('name inputs throw errors for 2 chars ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="name-input"]').type("se");
      cy.contains(errorMessages.name)
    });
    it('email inputs throw errors for sena@wit. ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="email-input"]').type("sena@wit.");
      cy.contains(errorMessages.email)
    });
    it('password inputs throw errors for 1234 ', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-cy="password-input"]').type("1234");
      cy.contains(errorMessages.password)
    });
  })

})