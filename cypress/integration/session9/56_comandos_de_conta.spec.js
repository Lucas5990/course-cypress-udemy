/// <reference types="cypress" />

/**
 * Lesson 56
 * Esta aula trata a criação de comandos customizados em arquivos separados invés de criar todos em "commands.js"
 * Isto traz maior organização no código
 */

import {LOGIN, MENU, CONTAS, MESSAGE} from '../../support/locators'
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
  
})
