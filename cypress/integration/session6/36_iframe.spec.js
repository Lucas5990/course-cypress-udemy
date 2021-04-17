/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar iframes
*/

describe('Pontos de Atenção', () => {
  before(() => {
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Iframes', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tfield').type('funciona').should('have.value','funciona')
      cy.wrap(body).find('#otherButton').click()
    })
  })
})