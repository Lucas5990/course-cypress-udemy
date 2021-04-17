/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Confirms
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Confirm', () => {
    cy.get('#confirm').click()
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Confirmado')
    })
  })
  it('Deny', () => {
    cy.get('#confirm').click()
    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Negado')
    })
  })
})