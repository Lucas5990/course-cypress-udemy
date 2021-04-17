/// <reference types="cypress"/>

/*
  Esta aula mostra como utilizar o Yielded value para trabalhar em alguma função
*/

describe('Sincronismo', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Sincronizando o título', () => {
    cy.title().then(title => console.log(title))
  })
})