/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar jquery selectors
  https://www.w3schools.com/jquery/jquery_ref_selectors.asp
*/

describe('Localizando elementos', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Xpath', () => {
    cy.xpath('')
  })
})