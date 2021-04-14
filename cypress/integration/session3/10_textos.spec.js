describe('Work with basic elements', () => {
  it('Text', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('body').should('contain', 'Cuidado')
    cy.get('span').should('contain', 'Cuidado')
//    cy.get('span').should('have.text', 'Cuidado')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })
    
})
