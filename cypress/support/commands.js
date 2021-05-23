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

Cypress.Commands.add('getToken', (user,password) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email: user,
      redirecionar : false,
      senha: password,
    }
  }).its('body.token').should('not.be.empty')
  .then(token => {
    Cypress.env('token', token)
    return token
  })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if(options.length === 1) {
    console.log(options)
    if(Cypress.env('token')){
      options[0].headers = {
        Authorization: `JWT ${Cypress.env('token')}`
      }
    }
  }
  return originalFn(...options)
})

Cypress.Commands.add('resetRest', (token) => {
  cy.request({
    method: 'GET',
    url: '/reset',
    headers: {
      Authorization: `JWT ${token}`
    }
  }).its('status').should('be.equal',200)
})

Cypress.Commands.add('getContaByName', name => {
  cy.getToken("lucasteste@mail.com","1").then(token => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      qs: {
          nome: name
        }
    }).then( res => res.body[0].id)
  })
})