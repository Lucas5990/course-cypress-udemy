/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Prompts
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Prompts', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('42')
    })
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Era 42?')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal(':D')
    })
    cy.get('#prompt').click()
  })
})