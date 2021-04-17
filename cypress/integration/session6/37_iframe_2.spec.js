/// <reference types="cypress"/>

/*
  Esta aula ensina a testar iframes separadamente mudando a URL
*/

describe('Pontos de Atenção', () => {
  before(() => {
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Deve tentar frame diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.get('#otherButton').click()
    cy.on('window:alert',msg => {
      expect(msg).to.be.equal('Click OK!')
    })
  })
})