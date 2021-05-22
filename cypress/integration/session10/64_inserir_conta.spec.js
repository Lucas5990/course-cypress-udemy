/// <reference types="cypress" />

/**

 */

 import '../../support/commandsContas'
 
 describe('Should test back-end API', () => {
   before(() => {
   })
   after(() => {
   })
  
  it('Should create an account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {
         email: "lucasteste@mail.com",
         redirecionar : false,
         senha: '1'
       }
    }).then( (res) => {
      console.log(res.body)
      cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: {
          Authorization: `JWT ${res.body.token}`
        },
        body: {
            nome: "Conta via rest"
          }
      })
    }).as('response')

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
  