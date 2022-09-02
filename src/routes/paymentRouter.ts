import { Router } from "express";

import { newPosPurchase,newOnlinePurchase } from "../controllers/paymentController";

import { posPurchaseSchema,onlinePurchaseSchema } from "../schemas/paymentSchema";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";

const purchasesRouter = Router();

purchasesRouter.post("/payment/pos",validateSchema(posPurchaseSchema),newPosPurchase);

purchasesRouter.post("/payment/online",validateSchema(onlinePurchaseSchema),newOnlinePurchase);

export default purchasesRouter;