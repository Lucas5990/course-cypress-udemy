/// <reference types="cypress"/>

/*
  Esta aula fala sobre Timeouts e Waits
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Nem todo mundo tem retry', () => {
    cy.get('#buttonCount')
      .click()
      .should('have.value',11)
  })
})