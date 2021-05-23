/// <reference types="cypress" />

/// <reference types="cypress" />

/**
  Testes de Front-end
 */

import {LOGIN, MENU, CONTAS, MESSAGE, MOVIMENTACAO, EXTRATO, SALDO} from '../../support/locators'
import '../../support/commandsContas'

describe('Should test Front-end only', () => {
  before(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/signin',
      response: {
        id:21255,
        nome:"lucas",
        token:"Uma string muito grande que não deveria ser aceita mas na verdade vai" 
      }
    })
    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [
        {
          conta_id:999,
          conta:"Carteira",
          saldo:"100.00"
        },
        {
          conta_id:99909,
          conta:"Carteira falsa",
          saldo:"1000000.00"
        }
      ]
    }).as('saldo')
    cy.login('lucasteste@mail.com','1')
  })
  after(() => {
    cy.resetApp()
  })
  
  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de teste')
    cy.get(MESSAGE).should('contain', 'Conta inserida com sucesso')
  })
  
  it('Should update an account', () => {
    cy.get(MENU.SETTINGS).click()
    cy.get(MENU.CONTAS).click()
    cy.xpath(CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(CONTAS.NOME)
    .clear()  
    .type('Conta alterada')
    cy.get(CONTAS.BTN_SALVAR).click()
    cy.get(MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })
  
  it.only('Should not create an account with same name', () => {
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
