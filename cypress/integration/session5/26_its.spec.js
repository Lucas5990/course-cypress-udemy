/// <reference types="cypress"/>

/*
  Esta aula mostra como utilizar o Its
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Its...', () => {
    const obj = { nome: 'User', idade: 20}
    cy.wrap(obj).should('have.property', 'nome', 'User')
    cy.wrap(obj).its('nome').should('be.equal','User')
    
    const obj2 = { nome: 'User', idade: 20, endereco: {rua: 'Street'}}
    cy.wrap(obj2).its('endereco').should('have.property','rua')
    cy.wrap(obj2).its('endereco').its('rua').should('be.equal','Street')
    cy.wrap(obj2).its('endereco.rua').should('be.equal','Street')

    cy.title().its('length').should('exist')
    
  })
})