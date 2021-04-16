/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Combo
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('ComboBox', () => {
    cy.get(`[data-test="dataEscolaridade"]`)  
      .select('2o grau completo')
      .should('have.value', '2graucomp')

    cy.get(`[data-test="dataEscolaridade"]`)  
      .select('1graucomp')
      .should('have.value', '1graucomp')
    })

})