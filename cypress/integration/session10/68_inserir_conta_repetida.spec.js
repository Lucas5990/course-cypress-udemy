/// <reference types="cypress" />

/**

 */

import '../../support/commandsContas'
 
 describe('Should test back-end API', () => {

  let token
  before(() => {
    cy.getToken('lucasteste@mail.com','1')
      .then(tkn => token = tkn)
  })
  beforeEach(() => {
    cy.resetRest(token)
  })
  
  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      body: {
          nome: "Conta via rest"
        }
    })
    .as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.be.property('id')
      expect(res.body).to.be.property('nome', 'Conta via rest')
    })
  })
   
  it('Should update an account', () => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: {
        Authorization: `JWT ${token}`
      },
      qs: {
          nome: 'Conta para alterar'
        }
    }).then(res => {
      cy.request({
        method: 'PUT',
        url: `/contas/${res.body[0].id}`,
        headers: {
          Authorization: `JWT ${token}`
        },
        body: {
          nome: 'Conta alterada via rest'
        }
      })
    })
  })
  
  it('Should not create an account with same name', () => {
        cy.request({
            url: `/contas`,
            method: 'POST',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome',
            },
            failOnStatusCode: false
        }).as('response')
        cy.get("@response").then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
  })
  
  it('Should create a transaction', () => {
  })
  
  it('Should get balance', () => {
  })
  
  it('Should remove a transaction', () => {
  console.log('teste')
  })
  
  })
  
