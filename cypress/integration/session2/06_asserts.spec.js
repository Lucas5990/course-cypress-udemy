/// <reference types="Cypress" />

/*
  Nesta aula é ensinado: como fazer assertivas
*/

it('Should check Equality', () => {
  const a = 1;
  expect(a).equal(1);
  expect(a, 'Mensagem em caso de falha').equal(1);
  expect(a).to.be.equal(1);
  expect(a).not.to.be.equal('b');
})

it('Truthy', () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;
  expect(true).to.be.true;
  expect(b).to.be.null;
  expect(a).not.to.be.null
  expect(c).to.be.undefined;
})

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2,
  }

  expect(obj).equal(obj);
  expect(obj).equals(obj);
  expect(obj).eq(obj);
  expect(obj).to.be.equal(obj);

  // Assim não funciona, pois são referências distintas. Precisa usar o deep ou eql
  // expect(obj).to.be.equal({a:1,b:2});
  expect(obj).to.be.deep.equal({a:1,b:2});
  expect(obj).eql({a:1,b:2});

  // Checa se o objeto possui a propriedade e com o valor informado
  expect(obj).include({a:1});
  expect(obj).to.have.property('b');
  expect(obj).to.have.property('b',2);

  expect(obj).to.not.be.empty;
  expect({}).to.be.empty;
})

it('Arrays', () => {
  const arr = [1,2,3];
  // Checa todos os membros (ordem não importa)
  expect(arr).to.have.members([3,1,2]);
  // Checa se inclui os membros (ordem não importa)
  expect(arr).to.include.members([3,1]);

  expect(arr).to.not.be.empty;
  expect([]).to.be.empty;
})

it('Types', () => {
  const num = 1
  const str = 'String'

  expect(num).to.be.a('number')
  expect(str).to.be.a('string')
  expect({}).to.be.an('object')
  expect([]).to.be.an('array')
})

it('String', () => {
  const str = 'String de teste'

  expect(str).to.be.equal('String de teste')
  expect(str).to.have.length(15)
  expect(str).to.contains('de tes')
  expect(str).to.match(/^String/)
  expect(str).to.match(/de/)
  expect(str).to.match(/teste$/)
  expect(str).to.match(/.{15}/)
  expect(str).to.match(/\W+/)
  expect(str).to.match(/\D+/)
})

it('Numbers', () => {
  const number = 4
  const floatNumber = 3.1415

  expect(number).to.be.equal(4);
  expect(number).to.be.above(3);
  expect(number).to.be.below(7);
  expect(floatNumber).to.be.equal(3.1415);
  expect(floatNumber).to.be.closeTo(3.15, 0.1);
  expect(floatNumber).to.be.closeTo(3.14, 0.1);
  expect(floatNumber).to.be.closeTo(3.13, 0.1);
})