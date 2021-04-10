/// <reference types="Cypress" />

/*
  Estes métodos servem para descrever testes ou conjuntos de testes
*/


// "it": Testes devem estar nos métodos it

it('An external test...', () => {
  
});

// "describe": serve para agrupar testes

describe("Should group tests...", () => {
  describe('Should group more specific tests', () => {
    it('An especific test...', () => {
      console.log("faz nada tbm não")
    })
  })

  it("An internal test...", () => {
    console.log("faz nada não")
  })
})

// ".skip": Pula o método it ou describe com esse atributo
it.skip('This test will not be executed', () => {
  console.log("não vai ser executado")
})

// ".only": Irá executar apenas o último only que encontrar no arquivo, também pode ser usado no it ou no describe
it.only('Should only execute this test', () => {
  console.log('Apenas este teste foi executado')
})