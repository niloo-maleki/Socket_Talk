import bodyParser from "body-parser";
import express from "express";
import routes from "@routes/auth.routes";
import { swaggerUi, swaggerSpec } from "./swagger";
import { corsConfig } from "./config/corsConfig";
import cors from "cors"; 

const app = express();

/*
  NOTE: 
  Ensure CORS middleware is applied before all other middleware in the application. 
  This is critical for allowing cross-origin requests from the frontend.
*/

app.use(cors(corsConfig));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use("/auth", routes);
app.use("/messages", routes);


app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

export default app;
