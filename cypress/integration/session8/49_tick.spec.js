/// <reference types="cypress"/>

/*
  Esta aula ensina a usar o tick
*/
describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Tick', () => {
    cy.get('#buttonTimePassed').click()
    // cy.get('#resultado > span').invoke('text').should('gt',2)

    cy.clock()
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(dateMs => {
      expect(parseInt(dateMs)).to.be.lte(0)
    })

    cy.tick(1000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(dateMs => {
      expect(parseInt(dateMs)).to.be.lte(1000)
    })

    cy.tick(5000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(dateMs => {
      expect(parseInt(dateMs)).to.be.lte(6000)
    })
  })
})