/// <reference types="cypress"/>

/*
  Esta aula ensina a utilizar Combo Multiplo
*/

describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })
  beforeEach(() => {
    cy.reload()
  })

  it('ComboBox', () => {
    cy.get(`[data-testid="dataEsportes"]`)  
      .select(['natacao','Corrida', 'nada'])
    })

    // TODO validar opções selecionadas do combo multiplo
    // TODO validar opções disponíveis do cambo multiplo
})