// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {LOGIN, MESSAGE, MENU} from '../support/locators'

Cypress.Commands.add('checkAlert', (locator, message) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(message)
  })
})

Cypress.Commands.add('login', (user,password) => {
  cy.visit('barrigareact.wcaquino.me')
  cy.get(LOGIN.USER).type(user)
  cy.get(LOGIN.PASSWORD).type(password)
  cy.get(LOGIN.BTN_LOGIN).click()
  cy.get(MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
  cy.get(MENU.SETTINGS).click()
  cy.get(MENU.RESETAR).click()
})