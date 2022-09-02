import { Router } from "express";

import { validNewCard,validCardActivation,validBlockCard,validUnlockCard } from "../middlewares/cardMiddleware";
import { checkApiKey } from "../middlewares/validateApikeyMiddleware";
import { createCard,setCardPass,blockCard,unlockCard,getExtract} from "../controllers/cardController";

import { cardSchema,cardPasswordSchema,blockCardSchema } from "../schemas/cardSchema";
import { validateSchema } from "../middlewares/validateSchemaMiddleware";

const cardRouter = Router();

cardRouter.post("/newcard",validateSchema(cardSchema),checkApiKey,validNewCard,createCard); 
cardRouter.post("/card/activate",validateSchema(cardPasswordSchema),validCardActivation,setCardPass); 
cardRouter.get("/cards/:id"); 
cardRouter.get("/card/:id/extract",getExtract); 
cardRouter.put("/card/block",validateSchema(blockCardSchema),validBlockCard,blockCard);
cardRouter.put("/card/unlock",validateSchema(blockCardSchema),validUnlockCard,unlockCard);

export default cardRouter;