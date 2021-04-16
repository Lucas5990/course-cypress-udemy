/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar radiobutton
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('RadioButton', () => {
    cy.get("#formSexoFem")
      .click()
      .should('be.checked')
    cy.get('#formSexoMasc')
      .should('not.be.checked')
    cy.get('[name="formSexo"]')
      .should('have.length', 2)
    })
  })