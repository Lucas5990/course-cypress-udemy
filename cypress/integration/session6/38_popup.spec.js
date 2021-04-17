/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Popups
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Deve verificar se o popup foi invocado', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('winOpen')
    })
    cy.get('#buttonPopUp').click()
    cy.get('@winOpen').should('be.called')
  
  })
})