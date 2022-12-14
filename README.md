# Projeto-18-Valex
<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://user-images.githubusercontent.com/80592317/188508152-5ca92282-78c3-45e8-8a86-e32758f49128.png" alt="Logo" width="120">

<h3 align="center">Valex API</h3>
  <p align="center">
   <strong>18º</strong> Projeto da formação fullstack Driven
</div>

<div align="center">
  <h3 align="center">Construído utilizando:</h3>


  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>  
</div>

#

### Descrição

Nesse projeto desenvolvemos um projeto backend utilizando Typescript com NodeJs e express que gerencia cartões de benefícios.
A API é responsável pela criação, recarga, ativação, assim como o processamento de compras.

  - Criação de cartão | **```POST '/newcard'```**
    - Header: { "x-api-key": "chave.de.compania" }
    - Body Schema: { "employee": "Nome Completo da Pessoa", "type": "groceries| restaurant | transport | education | health" }
    
  - Ativação do cartão | **```POST '/card/activate'```**
    - Body Schema: { "cardId": id, "securityCode": "CVC", "password": "PASS" }
  
  - Ver transações e saldo de um cartão | **```GET '/card/:id/extract'```**
    - Params: identificador do cartão
  
  - Bloquear um cartão | **```PUT '/card/block'```**
    - Body Schema: { "cardId": id, "password": "PASS" }
    
  - Desbloquear um cartão | **```PUT '/card/unlock'```**
    - Body Schema: { "cardId": id, "password": "PASS" }
  
  - Carregar um cartão  | **```POST '/recharge'```**
    - Header: { "x-api-key": "chave.de.compania" }
    - Body Schema: { "cardId": id, "amount": value }
  
  - Compras pos | **```POST '/purchase/pos'```**
    - Body Schema: { "cardId": id, "password": "pass", "businessId: id, "amount": value }
  
  - Compras Online | **```POST '/purchase/online'```**
    - Body Schema: { "number": "card-number, "holder": "holder-name", "expiry":  "MM/YY", "cvv": "CVV", "businessId: id, "amount": value }
