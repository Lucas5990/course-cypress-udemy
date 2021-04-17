/// <reference types="cypress"/>

/*
  Esta aula ensina a validar opções dos combos
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('ComboBox', () => {
    cy.get('[data-test="dataEscolaridade"] option')
    .should('have.length',8)
    cy.get('[data-test="dataEscolaridade"] option')
      .then($arr => {
        let values = []
        $arr.each(function(){values.push(this.innerHTML)})
        expect(values).to.include.members(["Superior","Mestrado"])
      })
  })

  it.only('ComboBox Multiplo', () => {
    cy.get('[data-testid="dataEsportes"]')
      .select(['natacao', 'Corrida', 'nada'])
    cy.get('[data-testid="dataEsportes"]')
      .then($el => {
        expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
        expect($el.val()).to.have.length(3)
      })
    cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])
  })
})