/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar TexfFields e TextAreas
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('TextFields', () => {
    cy.get("#formNome")
      .type('Cypress Test')
      .should('have.value', 'Cypress Test')

    cy.get('#elementosForm\\:sugestoes')
      .type('textarea')
      .should('have.value', 'textarea')
      
      cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('???')
      
      cy.get('[data-cy=dataSobrenome]')
      .type('teste12345{backspace}{backspace}')
      .should(`have.value`, 'teste123')
      
      cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type('Erro{selectall}acerto', {delay:100})
        .should('have.value', 'acerto')
  })  
})