/// <reference types="cypress"/>

/*
  Esta aula ensina o básico sobre selecionar elementos e fazer assertivas em textos.

  # Existem duas formas de busca
  cy.get
  cy.contains

  # Existe um método para recarregar a  página
  cy.reload


*/

describe('Work with basic elements', () => {
  it('Links', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
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