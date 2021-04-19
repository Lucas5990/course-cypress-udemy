/// <reference types="cypress"/>

/*
  Esta aula ensina a usar o clock para enganar a data do sistema
  NÃO DÁ PRA EXECUTAR O CLOCK DUAS VEZES NO MESMO TESTE
*/
describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Clock', () => {
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain','18/04/2021')
    
    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain','31/12/1969')
    
    const date = new Date(2012, 3, 10, 15, 23, 50)
    cy.clock(date.getTime())
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain','10/04/2012')
  })
})