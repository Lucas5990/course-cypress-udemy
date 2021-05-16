/// <reference types="cypress" />

/**

 */

 import {LOGIN, MENU, CONTAS, MESSAGE, MOVIMENTACAO, EXTRATO, SALDO} from '../../support/locators'
 import '../../support/commandsContas'
 
 describe('Should test at a functional level', () => {
   before(() => {
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
     cy.xpath(CONTAS.XP_BTN_ALTERAR).click()
     cy.get(CONTAS.NOME)
     .clear()  
     .type('Conta alterada')
     cy.get(CONTAS.BTN_SALVAR).click()
     cy.get(MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })
    
    it('Should not create an account with same name', () => {
      cy.acessarMenuConta()
      cy.inserirConta('Conta alterada')
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

 })
 