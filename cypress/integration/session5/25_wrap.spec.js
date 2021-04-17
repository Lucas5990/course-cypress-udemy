/// <reference types="cypress"/>

/*
  Esta aula fala sobre Wraps
*/

describe('Helpers', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Wrap', () => {
    const obj = {nome: 'User', idade:20}
    expect(obj).to.have.property('nome')
    //Wrapers servem para encapsular objetos comuns em objetos cypress para utilizar encadeamento com .should por exemplo
    cy.wrap(obj).should('have.property','nome')

    cy.get('#formNome').then(el => {
      //Com jquery
      el.val('funciona tbm')
      // Com wrapper cypress
      cy.wrap(el).type('funciona');
    })

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })
    cy.get('#buttonSimple').then(() => console.log('encontrei o botão simple'))
    // Não é sincrono
    // promise.then(num => console.log(num))
    cy.wrap(promise).then(num => console.log(num))
    cy.get('#buttonList').then(() => console.log('encontrei o botão list'))
  })
})