it('nada agora', function(){});


// Função Não-anônima
// function soma(a,b){
//   return a + b;
// }

// Função anônima
// const soma = function(a,b){
//   return a+b;
// }

// Arrow Function
// const soma = (a,b) => {
//   return a + b;
// }

// Arrow Function sem bloco - Retorno implícito
// const soma = (a,b) => a+b;

//Arrow Function com apenas um parâmetro
const soma = a => a+a;

console.log(soma(1,4));

it('a function test...', function(){
  console.log('Function',this);
});

/* 
  Existe uma diferença no THIS de funções comuns e arrow functions. 
  Functions: this referencia o contexto de quem chamou a função;
  Arrow: Mantém o contexto superior.
*/