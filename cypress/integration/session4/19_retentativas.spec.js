/// <reference types="cypress"/>

/*
  Esta aula fala sobre Yields e Retry
*/

describe('Retentativas', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Deve fazer retentativas', () => {
    cy.get('#novoCampo').click()
    // cy.get('#buttonDelay').click()
    cy.get('#novoCampo')
      .should('exist')
      .should('not.exist')

    })
})