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

  it('Should vs Then', () => {
    // Dentro do Then pode mudar o return (se não especificar, retornará o elemento)
    cy.get('#buttonListDOM').then($el => {
      return 2
    }).and('equal', 2)
    // Dentro do Should o return será ignorado
    // cy.get('#buttonListDOM').should($el => {
    //   return 2
    // }).and('equal', 2)

    // Dentro do Then pode buscar outro elemento com cy.get
    cy.get('#buttonListDOM').then($el => {
      cy.get('span')
    })
    // Dentro do Should NÃO pode buscar outro elemento com cy.get pois dá loop infinito
    // cy.get('#buttonListDOM').should($el => {
    //   cy.get('span')
    // })
  })
})