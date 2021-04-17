/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Alerts com Mock
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Alert com Mocks', () => {
    let stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
  
  })
})