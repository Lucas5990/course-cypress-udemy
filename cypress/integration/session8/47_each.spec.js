/// <reference types="cypress"/>

/*
  Esta aula ensina a criar comandos customizados
  No arquivo support/commands.js

*/
describe('Pontos de Atenção', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('Each', () => {
    cy.get('#formNome').type('Lucas')
    cy.get('[data-cy=dataSobrenome]').type('Andrade')
    cy.get(`[name="formSexo"][value="M"]`).click()
    cy.get("[name=formComidaFavorita]").each($el => {
      if($el.val() !== 'vegetariano') cy.wrap($el).click()
    })
    cy.get('[data-test=dataEscolaridade]').select('Doutorado')
    cy.get('[data-testid=dataEsportes]').select('Corrida')
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
  })
})