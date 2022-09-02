import { Router } from "express";

import cardsRouter from "./cardRouter";
import rechargeRouter from "./rechargeRouter";
import purchasesRouter from "./paymentRouter";
const router = Router();

router.use(cardsRouter);
router.use(rechargeRouter);
router.use(purchasesRouter);


export default router;