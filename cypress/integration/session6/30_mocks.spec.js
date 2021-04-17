/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Mocks (Teórico)
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Mocks', () => {
    // Nada ainda
  })
})