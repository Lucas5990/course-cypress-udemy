/// <reference types="cypress"/>

/*
  Esta aula mostra como utilizar o Invoke
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Invoke', () => {
    const getValue = () => 1;
    const soma = (a,b) => a+b;
    cy.wrap({fn: getValue}).invoke('fn').should('be.equal',1)
    cy.wrap({fn: soma}).invoke('fn',2,5).should('be.equal',7)

    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window().invoke('alert','Opa!!')
    cy.get('#resultado').invoke('html', '<input type="button" value="hacked"/>')
  })
})