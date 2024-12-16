import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { AuthDocs } from "@src/docs/routes/auth.docs";
import { MessageDocs } from "./docs/routes/message.docs";

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Authentication API",
        version: "1.0.0",
        description: "API for user login and registration",
      },
      servers: [
        {
          url: "http://localhost:3002",
        },
      ],
      paths: {
        ...AuthDocs,
        ...MessageDocs,
      },
    },
    apis: [],
  };

  const swaggerSpec = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };