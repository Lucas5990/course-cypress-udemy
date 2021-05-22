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
  })
  
  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
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
    })
    
    it('Should not create an account with same name', () => {
    })
    
    it('Should create a transaction', () => {
    })
    
    it('Should get balance', () => {
    })
    
    it('Should remove a transaction', () => {
     
    })
    
  })
  