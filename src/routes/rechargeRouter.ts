import { Router } from "express";

import { rechargeSchema } from "../schemas/rechargeSchema";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";

import { checkApiKey } from "../middlewares/validateApikeyMiddleware";
import { rechargeCard } from "../controllers/rechargeController";

const rechargeRouter = Router();

rechargeRouter.post('/recharge',validateSchema(rechargeSchema),checkApiKey,rechargeCard);

export default rechargeRouter;