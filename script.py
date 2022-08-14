# Código feito em arquivo único apenas por facilitação de visualização da linha de raciocínio

# SE tivéssemos um BackEnd:
# Considerando que, hipotéticamente, este é um projeto NodeJS com as dependências mysql2 e dotenv devidamente instaladas (já com o arquivo .env com as variáveis de ambiente setadas e configuradas) com a tabela disponibilizada através de um banco de dados SQL

# import os
# import dotenv
# import mysql.connector

# dotenv.load_dotenv()

# conn = mysql.connector.connect(
#   host=os.getenv('MYSQL_HOST'),
#   user=os.getenv('MYSQL_USER'),
#   password=os.getenv('MYSQL_PASSWORD'),
# )

# cursor = conn.cursor()
# cursor.execute('SELECT * FROM database.table_vigente')
# result = cursor.fetchall()

# Expectativa de retorno
resultMock = [
  {
    'opcao': '1',
    'descricao': 'Ampliação da capacidade do armazém ZDP em 5%',
    'custoDoInvestimento': '470000',
    'retornoEsperado': '410000'
  },
  {
    'opcao': '2',
    'descricao': 'Ampliação da capacidade do armazém MGL em 7%',
    'custoDoInvestimento': '400000',
    'retornoEsperado': '330000'
  },
  {
    'opcao': '3',
    'descricao': 'Compra de empilhadeira',
    'custoDoInvestimento': '170000',
    'retornoEsperado': '140000'
  },
  {
    'opcao': '4',
    'descricao': 'Projeto de P&D I',
    'custoDoInvestimento': '270000',
    'retornoEsperado': '250000'
  },
  {
    'opcao': '5',
    'descricao': 'Projeto de P&D II',
    'custoDoInvestimento': '340000',
    'retornoEsperado': '320000'
  },
  {
    'opcao': '6',
    'descricao': 'Aquisição de novos equipamentos',
    'custoDoInvestimento': '230000',
    'retornoEsperado': '320000'
  },
  {
    'opcao': '7',
    'descricao': 'Capacitação de funcionários',
    'custoDoInvestimento': '50000',
    'retornoEsperado': '90000'
  },
  {
    'opcao': '8',
    'descricao': 'Ampliação da estrutura de carga rodoviária',
    'custoDoInvestimento': '440000',
    'retornoEsperado': '190000'
  },
]

# Supondo que a pessoa usuária inseriu em um input o capital inicial
inputValue = '1000000'

# Helpers functions
def is_investment_selected(selecteds_array, compare_array, n1, n2):
    if n1 in selecteds_array and n2 in compare_array:
        i = compare_array.index(n2)
        compare_array.pop(i)
        return compare_array

# Lógica do service
def whereInvest(inputValue):
    investment = float(inputValue)
    array_compare = resultMock
    purchased_investments = []
    index = 0
    compensates_more = [];

    investment1 = resultMock[0]
    investment5 = resultMock[4]
    investment2 = resultMock[1]
    investment4 = resultMock[4]

    while investment > 0 and index != -1:
        number_compare = int(array_compare[0]['custoDoInvestimento']) - int(array_compare[0]['retornoEsperado'])
        for i in range(1, len(array_compare)):
            difference_expenses_earned = int(array_compare[i]['custoDoInvestimento']) - int(array_compare[i]['retornoEsperado'])
            if number_compare > difference_expenses_earned:
                index = i
                number_compare = difference_expenses_earned

        if index == -1:
            break
        investment -= int(array_compare[index]['custoDoInvestimento'])
        if investment < 0:
            break
        purchased_investments.append(array_compare[index])
        array_compare.pop(index)

        modifyVariable = -1
        for i in range(len(array_compare)):
            modifyVariable += 1
            if int(array_compare[modifyVariable]['custoDoInvestimento']) > investment:
                del array_compare[modifyVariable]
                modifyVariable -= 1

        array_compare = is_investment_selected(purchased_investments, array_compare, investment1, investment5) or array_compare
        array_compare = is_investment_selected(purchased_investments, array_compare, investment2, investment4) or array_compare

        index = 0
        if len(array_compare) == 0:
            index = -1

    for i in range(len(purchased_investments)):
      compensates_more.append(purchased_investments[i]['opcao'])
    
    return {'compensates_more': compensates_more, 'purchased_investments': purchased_investments}

result = whereInvest(1000000)
print(result)