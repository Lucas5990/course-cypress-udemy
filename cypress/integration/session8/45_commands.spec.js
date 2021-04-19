/// <reference types="cypress"/>

/*
  Esta aula ensina a criar comandos customizados
  No arquivo support/commands.js

*/
describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Custom Commands', () => {
    // cy.get('#alert').click()
    // cy.on('window:alert', msg => {
    //   expect(msg).to.be.equal('Alert Simples')
    // })
    cy.checkAlert('#alert','Alert Simples')
  })
})