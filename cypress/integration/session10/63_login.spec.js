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
  