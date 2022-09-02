import * as companyRepository from "../repositories/companyRepository";

export async function verifyApiKey(key: string) {
  if (!key) throw { type: "NoKeyProvided" };

  const company = await companyRepository.findByApiKey(key);
  if (!company) throw { type: "InvalidApiKey" };

  delete company.apiKey;
  return company;
}