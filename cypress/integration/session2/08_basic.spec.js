/// <reference types="cypress"/>

describe('Cypress Basics', () => {
  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
      .should('have.value','Clique Me!')
      .click()
      .should('have.value','Obrigado!')

  })
})