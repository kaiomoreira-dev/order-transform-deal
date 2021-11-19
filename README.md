# Guia

**RF**
* Requisito Funcionall

**RNF**
* Requisito não Funcional

**RN**
* Regra de negócio

<!-- # Cadastrar Deal na PipeDrive
* Deve ser possivel criar um Deal na PipeDrive consumindo a API.
* 
**RNF** -->

# Transformar Deal da PipeDrive em Order na Bling
* Dever ser possivel criar um pedido na Bling consumindo a API do PipeDrive

**RN**
* Salvar pedidos criado no banco de dados MongoDB
  
**RN**
* Não deve ser possivel criar um pedido vazio
* Criar order apenas com Deals com status 200

# Listagem de Order criado na Bling
* Dever ser possivel mostrar todos os pedidos salvo no banco de dados mongoDB
* Deve ser possivel mostrar o valor total de todas as Order salvas
* Deve ser possivel mostrar order pelo id
* Deve ser possivel mostrar order pela data
* Deve ser possivel mostrar a order pelo nome