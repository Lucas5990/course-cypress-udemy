/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar hooks

  # Se houver um describe dentro de outro, o mais interno ira sobrescrever os hooks ou herdar caso não haja o mesmo hook
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado')
    cy.get('span').should('contain', 'Cuidado')
  //  cy.get('span').should('have.text', 'Cuidado')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })
  it('Links', () => {
    cy.get('[href="#"]').click()
    cy.get("#resultado")
    .should('have.text', 'Voltou!')
    cy.reload()
    cy.get("#resultado")
    .should('not.have.text', 'Voltou!')
    cy.contains('Voltar').click()
    cy.get("#resultado")
    .should('have.text', 'Voltou!')  
  })
})
