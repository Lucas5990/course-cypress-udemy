/// <reference types="cypress"/>

/*
  Esta aula fala sobre Yields e Retry
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Deve fazer retentativas', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain','Item 1')
    cy.get('#lista li span')
      .should('contain','Item 2')
  })
})