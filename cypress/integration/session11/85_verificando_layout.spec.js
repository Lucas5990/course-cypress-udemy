/// <reference types="cypress" />
/**
*/

import {LOGIN, MENU, CONTAS, MESSAGE, MOVIMENTACAO, EXTRATO, SALDO} from '../../support/locators'
import '../../support/commandsContas'
import '../../support/buildEnv'
import buildEnv from '../../support/buildEnv'
  
describe('Should test Front-end only', () => {
  beforeEach(() => {
    buildEnv()
    cy.login('lucasteste@mail.com','1')
  })
  after(() => {
    // cy.resetApp()
  })
  
  it('Should create an account', () => {
    cy.intercept('POST','/contas', {
        body: {
            id: 3,
            nome: 'Conta de teste',
            visivel: true,
            usuario_id: 1
        }
    })
    cy.acessarMenuConta()
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
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: 'coco',
                visivel: true,
                usuario_id: 1
            }
        ]
    }).as('saveConta')
    cy.inserirConta('Conta de teste')
    cy.get(MESSAGE).should('contain', 'Conta inserida com sucesso')
  })
  
  it('Should update an account', () => {
    cy.server()
    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: {
        id: 1,
        nome: 'Conta alterada',
        visivel: true
      }
    })

    cy.acessarMenuConta()
    cy.xpath(CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(CONTAS.NOME)
    .clear()  
    .type('Conta alterada')
    cy.get(CONTAS.BTN_SALVAR).click()
    cy.get(MESSAGE).should('contain', 'Conta atualizada com sucesso')
  })
  
  it('Should not create an account with same name', () => {
    cy.intercept('POST', '/contas', {
      body: [
          {
            error: 'Já existe uma conta com esse nome!',
          },
      ],
      statusCode: 400
    }).as('saveContaMesmoNome')
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.get(MESSAGE).should('contain', '400')
  })
  
  it('Should create a transaction', () => {
    cy.intercept('POST', '/transacoes', {
      body: [
        {
          conta_id: 3321,
          data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: 'desc',
          envolvido: 'inter',
          status: true,
          tipo: 'REC',
          valor: '123'
        }
      ],
    })
    cy.server()
    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:movimentacaoSalva'
    }).as('extratoAtualizado')
    cy.get(MENU.MOVIMENTACAO).click()
    cy.get(MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(MOVIMENTACAO.VALOR).type('123')
    cy.get(MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(MOVIMENTACAO.CONTA).select('Conta para alterar')
    cy.get(MOVIMENTACAO.STATUS).click()
    cy.get(MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(MESSAGE).should('contain', 'sucesso')
    cy.get(EXTRATO.NUM_LINHAS).should('have.length', 7)
    cy.xpath(EXTRATO.XP_BUSCA_ELEMENTO).should('exist')
  })
  
  it('Should get balance', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '/transacoes/**',
      response: {
          "conta": "Conta para saldo",
          "id": 31436,
          "descricao": "Movimentacao 1, calculo saldo",
          "envolvido": "CCC",
          "observacao": null,
          "tipo": "REC",
          "data_transacao": "2019-11-13T03:00:00.000Z",
          "data_pagamento": "2019-11-13T03:00:00.000Z",
          "valor": "3500.00",
          "status": false,
          "conta_id": 42079,
          "usuario_id": 1,
          "transferencia_id": null,
          "parcelamento_id": null
      }
  })

  cy.route({
      method: 'PUT',
      url: '/transacoes/**',
      response: {
          "conta": "Conta para saldo",
          "id": 31436,
          "descricao": "Movimentacao 1, calculo saldo",
          "envolvido": "CCC",
          "observacao": null,
          "tipo": "REC",
          "data_transacao": "2019-11-13T03:00:00.000Z",
          "data_pagamento": "2019-11-13T03:00:00.000Z",
          "valor": "3500.00",
          "status": false,
          "conta_id": 42079,
          "usuario_id": 1,
          "transferencia_id": null,
          "parcelamento_id": null
      }
  })

  cy.get(MENU.HOME).click()
  cy.xpath(SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

  cy.get(MENU.EXTRATO).click()
  cy.xpath(EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
  // cy.wait(1000)
  cy.get(MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
  cy.get(MOVIMENTACAO.STATUS).click()
  cy.get(MOVIMENTACAO.BTN_SALVAR).click()
  cy.get(MESSAGE).should('contain', 'sucesso')

  cy.route({
      method: 'GET',
      url: '/saldo',
      response: [{
          conta_id: 999,
          conta: "Carteira",
          saldo: "4034.00"
      },
      {
          conta_id: 9909,
          conta: "Banco",
          saldo: "10000000.00"
      },
      ]
  }).as('saldoFinal')

  cy.get(MENU.HOME).click()
  cy.xpath(SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
  })
  
  it('Should remove a transaction', () => {
    cy.intercept('DELETE', '/transacoes/**', {
      body: {},
      statusCode: 204
    }).as('del')
    cy.get(MENU.EXTRATO).click()
    cy.xpath(EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(MESSAGE).should('contain', 'sucesso')
  })

  it('Should validate data sent', () => {
    const reqStub = cy.stub()
    cy.server()
    cy.route({
        method: 'POST',
        url: '/contas',
        response: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
        // onRequest: req => {
        //     console.log(req)
        //     expect(req.request.body.nome).to.be.empty
        //     expect(req.request.headers).to.have.property('Authorization')
        // }
        onRequest: reqStub
    }).as('saveConta')

    cy.acessarMenuConta()

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
            { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
        ]
    }).as('contasSave')

    cy.inserirConta('{CONTROL}')
    // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
    cy.wait('@saveConta').then(() => {
        console.log(reqStub.args[0][0])
        expect(reqStub.args[0][0].request.body.nome).to.be.empty
        expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
    })
    cy.get(MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it.only('Should test colors', () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            { "conta": "Conta para movimentacoes", "id": 31434, "descricao": "Receita paga", "envolvido": "AAA", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 42077, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 31435, "descricao": "Receita pendente", "envolvido": "BBB", "observacao": null, "tipo": "REC", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1500.00", "status": false, "conta_id": 42078, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 31436, "descricao": "Despesa paga", "envolvido": "CCC", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "3500.00", "status": true, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 31437, "descricao": "Despesa pendente", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2019-11-13T03:00:00.000Z", "data_pagamento": "2019-11-13T03:00:00.000Z", "valor": "-1000.00", "status": false, "conta_id": 42079, "usuario_id": 1, "transferencia_id": null, "parcelamento_id": null }
        ]
    })

    cy.get(MENU.EXTRATO).click()
    cy.xpath(EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
    cy.xpath(EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
    cy.xpath(EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
    cy.xpath(EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
})

})

