import { faker } from "@faker-js/faker";

import * as cryptUtils from '../utils/cryptUtils';
import * as employeeUtils from '../utils/employeeUtils';

import * as cardRepository from '../repositories/cardRepository';
import * as paymentRepository from '../repositories/paymentRepository';
import * as rechargeRepository from '../repositories/rechargeRepository';
import * as businessRepository from '../repositories/businessRepository';

import { TransactionTypes } from "../repositories/cardRepository";

export async function createCard(employee: {id: number, fullName: string}, type: TransactionTypes) {
  const employeeId = employee.id;
  const cardholderName = employeeUtils.formatName(employee.fullName);
  const typeCard = type;

  const CVV = faker.finance.creditCardCVV();
  const card = cardFactory(employeeId, cardholderName, typeCard, CVV);

  const newCard = await cardRepository.insert(card);
  return { ...newCard, securityCode: CVV };
}

export async function rechargeCard(cardId: number, amount: number) {
  const card = await getCard(cardId);
  if (!card.password) throw { type: "CardNotActive" };

  await rechargeRepository.insert({ cardId, amount });
}

export async function cardIsValid(id: number, CVV: string) {
  const card = await getCard(id);

  if(card.password) throw { type: "CardHasPassword"};
  const verifyCVV = cryptUtils.decryptSecurityCode(card.securityCode);
  if(verifyCVV !== CVV) throw { type: "InvalidCVV"};

  return true;
}


export async function blockCard(id: number){
  const isBlocked = true;
  console.log("cheguei no service");

  await cardRepository.update(id, { isBlocked });
  console.log("dei o update");

}

export async function unlockCard(id: number) {
  const isBlocked = false;
  await cardRepository.update(id, { isBlocked });
} 

export async function cardIsBlocked(id:number, password: string) {
  const card = await getCard(id);

  if (!cryptUtils.decryptPassword(password,card.password))
    throw { type: "IncorrectPassword" }; 

  return card.isBlocked;
}

export async function purchasePOS(cardId: number, password: string, businessId: number, amount: number){
  const card = await getCard(cardId);

  checkFitCard(card);
  if(card.password && !cryptUtils.decryptPassword(password, card.password)) throw { type: "IncorrectPassword" };

  await insertTransaction(cardId, businessId, amount, card.type);
}

export async function purchaseOnline(number: string, holder: string, cvv: string, expiryDate: string, businessId: number, amount: number) {
  const card = await cardRepository.findByCardDetails(number, holder, expiryDate);

  if (!card) throw { type: "CardNotFound" };
  if (!checkValidDate(card.expirationDate)) throw { type: "CardExpired" };
  
  checkFitCard(card); 
  if (cryptUtils.decryptSecurityCode(cvv) !== card.securityCode) throw { type: "InvalidCVV" };

  await insertTransaction(card.id, businessId, amount, card.type);
}

async function insertTransaction(cardId: number, businessId: number, amount: number, type: TransactionTypes) {
  const extract = await getExtract(cardId);
  if (extract.balance < amount) throw { type: "InsufficientBalance" };

  if (await businessIsValid(businessId, type))
    await paymentRepository.insert({ cardId, businessId, amount });
}

async function businessIsValid(businessId: number, type: TransactionTypes) {
  const business = await businessRepository.findById(businessId);
  
  if (!business) throw { type: "BusinessNotFound" };
  if (business.type !== type) throw { type: "BusinessTypeInvalid" };

  return true;
}

async function checkFitCard(card: any) {
  if(card.isBlocked) throw { type: "CardIsBlocked" };
  if(!card.password) throw { type: "CardInative" };
}

export async function getExtract(idCard: number){
  let payments = await paymentRepository.findByCardId(idCard);
  let recharges = await rechargeRepository.findByCardId(idCard);

  payments = refactPayments(payments);
  recharges = refactRecharges(recharges);

  const balance = await calculeBalance(payments, recharges);

  return { balance, transactions: payments, recharges }
}

async function calculeBalance(payments: any[], recharges: any[]) {
  let balance = 0;

  for (const payment of payments) {
    balance -= payment.amount;
  }

  for (const recharge of recharges) {
    balance += recharge.amount;
  }
  return balance;
}

async function getCard(id: number){
  const card = await cardRepository.findById(id);
  if (!card) throw { type: "CardNotFound" };

  if (!checkValidDate(card.expirationDate)) throw { type: "CardExpired" };
  return card;
}

export async function createPass(id: number, pass: string){
  const card = await getCard(id);

  if(card.password) throw { type: "CardHasPassword"};
  const password = cryptUtils.encryptPassword(pass);

  await cardRepository.update(id, { password });
}

function generateValidDate(now: Date) {
  const month = now.getMonth() + 1;
  const year = now.getFullYear() + 5;
  return `${month}/${year}`;
}

function checkValidDate(date: string){
  const now = new Date();
  const [month, year] = date.split('/');
  const cardMonth = parseInt(month);
  const cardYear = parseInt(year);

  if(cardYear < now.getFullYear()) return false;
  if(cardMonth < now.getMonth() + 1) return false;

  return true;
}

function cardFactory(employeeId: number, cardholderName: string, type: TransactionTypes, generateCVV: string) {
  const number = faker.finance.creditCardNumber();
  const expirationDate = generateValidDate(new Date());

  const securityCode = cryptUtils.encryptSecurityCode(generateCVV);

  const card = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  };

  return card;
}

function refactPayments(payments: any[]) {
  return payments.map(payment => {
    payment.timestamp = payment.timestamp.toLocaleDateString();
    return payment;
  });
}

function refactRecharges(recharges: any[]) {
  return recharges.map(recharge => {
    recharge.timestamp = recharge.timestamp.toLocaleDateString();
    return recharge;
  });
}