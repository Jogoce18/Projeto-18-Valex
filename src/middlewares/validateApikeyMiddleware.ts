import { Request, Response, NextFunction } from "express";

import * as service from "../services/companyService";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const key: any = req.header("x-api-key");

  const company = service.verifyApiKey(key);
  if(!company) throw { type: "InvalidApiKey" };

  res.locals.company = company;

  next();
}