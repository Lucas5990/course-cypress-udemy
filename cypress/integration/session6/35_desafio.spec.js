/// <reference types="cypress"/>

/*
  1. Com o formulário vazio, clicar em cadastrar e validar a mensagem
  2. Preencher o nome, clicar em cadastrar e validar a proxima mensagem
  3. Preencher o sobrenome, clicar em cadastrar e validar a proxima mensagem
  4. Preencher o sexo radio button, clicar em cadastrar e validar a mensagem "Cadastrado!"
*/

describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Desafio', () => {
    //1
    const stub = cy.stub().as('alert')
    cy.on('window:alert', stub)
    cy.get('#formCadastrar').click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
      })
      //2
      cy.get('#formNome').type("Lucas")
      cy.get('#formCadastrar').click()
        .then(() => {
          expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
      //3 
      cy.get('[data-cy=dataSobrenome]').type("Andrade")
      cy.get('#formCadastrar').click()
        .then(() => {
          expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
      //4
      cy.get('#formSexoMasc').click()
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
  })
})