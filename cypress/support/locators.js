const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    SETTINGS: '[data-test=menu-settings]',
    CONTAS: '[href="/contas"]',
    RESETAR: '[href="/reset"]',
    HOME: '[data-test=menu-home]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]'
  },
  CONTAS: {
    NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    FN_XP_BTN_ALTERAR: name => `//table//td[contains(.,"${name}")]/..//i[@class="far fa-edit"]`
  },
  MOVIMENTACAO: {
    DESCRICAO: '[data-test=descricao]',
    VALOR: '[data-test=valor]',
    INTERESSADO: '[data-test=envolvido]',
    STATUS: '[data-test=status]',
    CONTA: '[data-test=conta]',
    BTN_SALVAR: '.btn-primary',
  },
  EXTRATO: {
    NUM_LINHAS: '.list-group > li',
    XP_BUSCA_ELEMENTO: '//span[contains(., "Desc")]/following-sibling::small[contains(.,"123")]',
    FN_XP_REMOVER_ELEMENTO: name => `//span[contains(.,'${name}')]/../../..//i[@class='far fa-trash-alt']`,
    FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`,
    FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`
  },
  SALDO: {
    FN_XP_SALDO_CONTA: NOME => `//td[contains(.,'${NOME}')]/../td[2]`
  },
  MESSAGE: '.toast-message'
}

export default locators;