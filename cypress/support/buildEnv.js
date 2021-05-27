const buildEnv = () => {
  cy.intercept('POST','/signin', {
    body: {
      id:21255,
      nome:"lucas",
      token:"Uma string muito grande que não deveria ser aceita mas na verdade vai" 
    }
  }).as('signIn')
  cy.intercept('GET', '/saldo', {
    body: [
      {
        conta_id:999,
        conta:"Carteira",
        saldo:"100.00"
      },
      {
        conta_id:99909,
        conta:"Carteira falsa",
        saldo:"1000000.00"
      }
    ]
  }).as('saldo')
  cy.intercept('GET', '/contas', {
    body: [
        {
            id: 1,
            nome: "Carteira",
            visivel: true,
            usuario_id: 1,
        },
        {
            id: 2,
            nome: 'Conta para alterar',
            visivel: true,
            usuario_id: 1
        }
    ]
  }).as('contas')
  cy.intercept('GET', '/extrato/**', {
    body: [
      {"conta":"Conta para movimentacoes","id":558780,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":603606,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta com movimentacao","id":558781,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":603607,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":558782,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":603608,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":558783,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":603608,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para saldo","id":558784,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":603608,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null},
      {"conta":"Conta para extrato","id":558785,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-05-22T03:00:00.000Z","data_pagamento":"2021-05-22T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":603609,"usuario_id":21255,"transferencia_id":null,"parcelamento_id":null}
    ]
  })
}

export default buildEnv