/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Checkbox
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('checkBox', () => {
    cy.get('#formComidaPizza')
      .click()
      .should('be.checked')
    cy.get(`[name="formComidaFavorita"]`)
      .click({multiple:true})
    cy.get('#formComidaPizza')
      .should('not.be.checked')

  })

})