/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Fixtures
  Foi criada a fixture userData na pasta fixtures
*/

describe('Outras funcionalidades do Cypress', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })
  
  it('Fixtures', () => {
    cy.fixture('userData').as('usuario').then(function() {
      cy.get('#formNome').type(this.usuario.nome)
      cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
      cy.get(`[name="formSexo"][value="${this.usuario.sexo}"]`).click()
      cy.get(`[name="formComidaFavorita"][value="${this.usuario.comida}"]`).click()
      cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade)
      cy.get('[data-testid=dataEsportes]').select(this.usuario.esporte)
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
    })
  })
})