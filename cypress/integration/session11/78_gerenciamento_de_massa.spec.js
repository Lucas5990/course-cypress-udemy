/// <reference types="cypress" />
/**
*/

import {LOGIN, MENU, CONTAS, MESSAGE, MOVIMENTACAO, EXTRATO, SALDO} from '../../support/locators'
import '../../support/commandsContas'
import '../../support/buildEnv'
import buildEnv from '../../support/buildEnv'
  
describe('Should test Front-end only', () => {
  beforeEach(() => {
    buildEnv()
    cy.login('lucasteste@mail.com','1')
  })
  after(() => {
    // cy.resetApp()
  })
  
  it('Should create an account', () => {
    cy.intercept('POST','/contas', {
        body: {
            id: 3,
            nome: 'Conta de teste',
            visivel: true,
            usuario_id: 1
        }
    })
    cy.acessarMenuConta()
    cy.intercept('GET', '/contas', {
        body: [
            {
                id: 1,
                nome: "Carteira",
                visivel: true,
                usuario_id: 1,
            },
            {
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: 'coco',
                visivel: true,
                usuario_id: 1
            }
        ]
    }).as('saveConta')
    cy.inserirConta('Conta de teste')
    cy.get(MESSAGE).should('contain', 'Conta inserida com sucesso')
  })
  
  it('Should update an account', () => {
    cy.server()
    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: {
        id: 1,
        nome: 'Conta alterada',
        visivel: true
      }
    })

    cy.acessarMenuConta()
    cy.xpath(CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(CONTAS.NOME)
    .clear()  
    .type('Conta alterada')
    cy.get(CONTAS.BTN_SALVAR).click()
    cy.get(MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })
  
  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.get(MESSAGE).should('contain', '400')
  })
  
  it('Should create a transaction', () => {
    cy.get(MENU.MOVIMENTACAO).click()
    cy.get(MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(MOVIMENTACAO.VALOR).type('123')
    cy.get(MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(MOVIMENTACAO.CONTA).select('Conta alterada')
    cy.get(MOVIMENTACAO.STATUS).click()
    cy.get(MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(MESSAGE).should('contain', 'sucesso')
    cy.get(EXTRATO.NUM_LINHAS).should('have.length', 7)
    cy.xpath(EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
  })
  
  it('Should get balance', () => {
    cy.get(MENU.HOME).click()
    cy.xpath(SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00')
  })
  
  it('Should remove a transaction', () => {
    cy.get(MENU.EXTRATO).click()
    cy.xpath(EXTRATO.FN_XP_REMOVER_ELEMENTO('Conta alterada')).click()
    cy.get(MESSAGE).should('contain', 'sucesso')
  })
  
})

