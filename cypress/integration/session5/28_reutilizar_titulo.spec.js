/// <reference types="cypress"/>

/*
  Esta aula ensina a reutilizar values no código
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Validar combo...', () => {
    let syncTitle
    cy.title().then(title => {
      syncTitle = title
    })
    cy.get('[data-cy="dataSobrenome"]').then(el => {
      cy.wrap(el).type(syncTitle)
    })
  })
})