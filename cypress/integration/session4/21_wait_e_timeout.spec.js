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

  it('Uso do TimeOut', () => {
    cy.get('#buttonDelay').click()
    // Timeout especifico para essa busca
    //cy.get('#novoCampo', {timeout:1000}).should('exist')
    // Também é possível alterar a propriedade "defaultCommandTimeout":1000 no arquivo cypress.json para mudar o timeout de todos os testes
    cy.get('#novoCampo').should('exist')
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
      .should('contain', 'Item 2')
  })
})