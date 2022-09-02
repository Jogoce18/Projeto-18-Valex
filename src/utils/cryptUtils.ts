import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Cryptr from "cryptr";

dotenv.config();

const cryptr = new Cryptr('myTotallySecretKey');

export function encryptSecurityCode(password: string) {
  return cryptr.encrypt(password);
}

export function decryptSecurityCode(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode);
}

export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function decryptPassword(password: string, encryptedPassword: string) {
  return bcrypt.compareSync(password, encryptedPassword);
}