/// <reference types="cypress" />

import {LOGIN, MENU, CONTAS, MESSAGE} from '../../support/locators'

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('lucasteste@mail.com','1')
  })
  after(() => {
    cy.resetApp()
  })
  it('Should create an account', () => {
    cy.get(MENU.SETTINGS).click()
    cy.get(MENU.CONTAS).click()
    cy.get(CONTAS.NOME).type('Conta de teste')
    cy.get(CONTAS.BTN_SALVAR).click()
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
  
})
