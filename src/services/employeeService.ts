import { TransactionTypes } from '../repositories/cardRepository';

import * as cardRepository from '../repositories/cardRepository';
import * as employeeRepository from '../repositories/employeeRepository';

export async function checkEmployeeExist(name: string){

  const employee = await employeeRepository.findByName(name);
  if (!employee) throw { type: "EmployeeNotFound" };

  return employee;
} 

export async function checkTypeCardExist(employeeId: number, type: TransactionTypes){

  const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  if (card) throw { type: "EmployeeAlreadyHasCard" };
}