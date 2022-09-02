import { Router } from "express";

import { validNewCard,validCardActivation } from "../middlewares/cardMiddleware";
import { checkApiKey } from "../middlewares/validateApikeyMiddleware";
import { createCard,setCardPass} from "../controllers/cardController";

import { cardSchema,cardPasswordSchema } from "../schemas/cardSchema";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";

const cardRouter = Router();

cardRouter.post("/newcard",validateSchema(cardSchema),checkApiKey,validNewCard,createCard); 
cardRouter.post("/card/activate",validateSchema(cardPasswordSchema),validCardActivation,setCardPass); 

export default cardRouter;