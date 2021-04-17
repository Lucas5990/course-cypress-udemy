/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Popups com links
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Checa URL do popup', () => {
    cy.contains('Popup2').should('have.prop', 'href').and('equal','https://wcaquino.me/cypress/frame.html')
  })
  it('Checa popups com URL dinamica', () => {
    cy.contains('Popup2').then($a => {
      console.log($a.prop('href'))
      const href = $a.prop('href')
      cy.visit(href)
      cy.get('#tfield').type('funciona')
    })
  })
  it.only('Checa popups forçando abrir na mesma página', () => {
    cy.contains('Popup2')
      .invoke('removeAttr','target')
      .click()
    cy.get('#tfield').type('agora a textbox está no contexto!')
  })
})