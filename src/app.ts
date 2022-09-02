import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import dotenv from "dotenv";
import router from "./routes/index";
dotenv.config();



const app = express();
app.use(cors());
app.use(json());
app.use(errorHandler);

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});