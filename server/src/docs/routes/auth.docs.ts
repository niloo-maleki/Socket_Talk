import { UserSchema } from "../schemas/user.schema";

export const AuthDocs = {
  "/auth/login": {
    post: {
      summary: "Login a user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
        },
        400: {
          description: "Missing username or password",
        },
        401: {
          description: "Invalid username or password",
        },
      },
    },
  },
  "/auth/register": {
    post: {
      summary: "Register a user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
        },
        400: {
          description: "Missing username or password",
        },
        409: {
          description: "Username already exists",
        },
      },
    },
  },
  "/auth/users": {
    get: {
      summary: "Get all users",
      tags: ["Auth"],
      responses: {
        200: {
          description: "List of all users",
          content: {
            "application/json": {
              type: "array",
              items: UserSchema,
            },
          },
        },
        500: {
          description: "Failed to retrieve users",
        },
      },
    },
  },
  
};



