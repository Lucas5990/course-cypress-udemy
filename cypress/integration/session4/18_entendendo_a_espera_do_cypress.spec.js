/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Combo Multiplo
*/

describe('Esperas...', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Deve aguardar elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').type('funciona')
    
    })
})