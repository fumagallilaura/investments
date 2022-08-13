// Código feito em arquivo único apenas por facilitação de visualização da linha de raciocínio

// SE tivéssemos um BackEnd:
// Considerando que, hipotéticamente, este é um projeto NodeJS com as dependências mysql2 e dotenv devidamente instaladas (já com o arquivo .env com as variáveis de ambiente setadas e configuradas) com a tabela disponibilizada através de um banco de dados SQL
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const conn = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
// });

// const query = 'SELECT * FROM database.table_vigente';
// const [result] = await conn.execute(query);

// Expectativa de retorno
const resultMock = [
  {
    opcao: '1',
    descricao: 'Ampliação da capacidade do armazém ZDP em 5%',
    custoDoInvestimento: '470000',
    retornoEsperado: '410000'
  },
  {
    opcao: '2',
    descricao: 'Ampliação da capacidade do armazém MGL em 7%',
    custoDoInvestimento: '400000',
    retornoEsperado: '330000'
  },
  {
    opcao: '3',
    descricao: 'Compra de empilhadeira',
    custoDoInvestimento: '170000',
    retornoEsperado: '140000'
  },
  {
    opcao: '4',
    descricao: 'Projeto de P&D I',
    custoDoInvestimento: '270000',
    retornoEsperado: '250000'
  },
  {
    opcao: '5',
    descricao: 'Projeto de P&D II',
    custoDoInvestimento: '340000',
    retornoEsperado: '320000'
  },
  {
    opcao: '6',
    descricao: 'Aquisição de novos equipamentos',
    custoDoInvestimento: '230000',
    retornoEsperado: '320000'
  },
  {
    opcao: '7',
    descricao: 'Capacitação de funcionários',
    custoDoInvestimento: '50000',
    retornoEsperado: '90000'
  },
  {
    opcao: '8',
    descricao: 'Ampliação da estrutura de carga rodoviária',
    custoDoInvestimento: '440000',
    retornoEsperado: '190000'
  },
]

// Supondo que a pessoa usuária inseriu em um input o capital inicial
// const inputValue = '1000000';

// Helpers functions
const isInvestmentSelected = (selectedsArray, compareArray, n1, n2) => {
  if (selectedsArray.includes(n1) && compareArray.includes(n2)) {
    const i = compareArray.indexOf(n2);
    compareArray.splice(i, 1);
    return compareArray;
  }
}

// Lógica do service
function wherInvest(inputValue) {
let investment = Number(inputValue);
let arrayCompare = [...resultMock];
const purchasedInvestments = [];
let index;
let opitionCompare = '1';

const investment1 = resultMock[0];
const investment5 = resultMock[4];
const investment2 = resultMock[1];
const investment4 = resultMock[4];

while (investment > 0 && index !== -1) {
  let numberCompare = Number(arrayCompare[0].custoDoInvestimento) - Number(arrayCompare[0].retornoEsperado);
  for (let i =  1; i < arrayCompare.length; i += 1) {
  const differenceExpensesEarned = arrayCompare[i].custoDoInvestimento - arrayCompare[i].retornoEsperado;
  if (numberCompare > differenceExpensesEarned) {
    index = i;
    opitionCompare = arrayCompare[i].opcao;
    numberCompare = differenceExpensesEarned;
  }
}
if (index === -1) break;
investment -= arrayCompare[index].custoDoInvestimento;
if (investment < 0) break;
purchasedInvestments.push(arrayCompare[index]);
arrayCompare.splice(index, 1);

for (let i = 0; i < arrayCompare.length; i += 1) {
  if (Number(arrayCompare[i].custoDoInvestimento) > Number(investment)) {
    arrayCompare.splice(i, 1);
    i -= 1;
  };
}

// if (purchasedInvestments.includes(investment1) && arrayCompare.includes(investment5)) {
//   const i = arrayCompare.indexOf(investment5);
//   arrayCompare.splice(i, 1);
// }
// Rafatorando:
arrayCompare = isInvestmentSelected(purchasedInvestments, arrayCompare, investment1, investment5) || arrayCompare;

// if (purchasedInvestments.includes(investment2) && arrayCompare.includes(investment4)) {
//   const i = arrayCompare.indexOf(investment4);
//   arrayCompare.splice(i, 1);
// }
// Rafatorando:
arrayCompare = isInvestmentSelected(purchasedInvestments, arrayCompare, investment2, investment4) || arrayCompare;

index = arrayCompare.length > 0 ? 0 : -1;
}

const compensatesMore = [];
for (let i = 0; i < purchasedInvestments.length; i += 1) {
  compensatesMore.push(purchasedInvestments[i].opcao);
}

// console.log(`Melhores opções: ${compensatesMore}`);
// console.log('Investimentos: ', purchasedInvestments);
  return {compensatesMore, purchasedInvestments}
}
// Montando a tabela para visualização
const tableBody = document.getElementById('table-body');
tableBody.innerHTML = resultMock.map((investment) => (
  `
    <tr>
      <td>${investment.opcao}</td>
      <td>${investment.descricao}</td>
      <td>${investment.custoDoInvestimento}</td>
      <td>${investment.retornoEsperado}</td>
    </tr>
  `
))

// Opções dinâmicas de investimento
const userInput = document.getElementById('invest');
const betterOptionsForUser = document.querySelector('#betterInvestments');
const t = wherInvest(Number(userInput.value)).compensatesMore
betterOptionsForUser.textContent = `
  Melhores opções  que maximizam o retorno total para essa valor: ${t}
`
console.log(t)

// Com R$1.000.000
const { compensatesMore, purchasedInvestments } = wherInvest(1000000);
const betterOptions = document.getElementById('betterOptions')
betterOptions.innerHTML = `
  Opções: ${compensatesMore.map((option) => option)}
`;

const simulationFor1million = document.getElementById('simulationFor1million')
simulationFor1million.innerHTML = `
  Investimentos: ${purchasedInvestments.map((option) => ` ${option.descricao}`)}`;

  const reloadButton = document.querySelector("#reload");

  // Event listeners for reload
  reloadButton.addEventListener("click", () => {
    // Opções dinâmicas de investimento
    const userInput = document.getElementById('invest');
    const betterOptionsForUser = document.querySelector('#betterInvestments');
    const t = wherInvest(Number(userInput.value)).compensatesMore
    betterOptionsForUser.textContent = `
      Melhores opções  que maximizam o retorno total para essa valor: ${t}
    `
    console.log(t)
  }, false);