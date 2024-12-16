import { MessageSchema } from "../schemas/message.schema";

export const MessageDocs = {
  "/messages/unread": {
    get: {
      summary: "Get unread messages for a specific user",
      tags: ["Messages"],
      parameters: [
        {
          name: "username",
          in: "query",
          required: true,
          description: "The username of the recipient",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful retrieval of unread messages",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: MessageSchema,
              },
            },
          },
          400: {
            description: "Missing or invalid username",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
  "/messages/read": {
    post: {
      summary: "Mark messages as read",
      tags: ["Messages"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  description: "The username of the recipient",
                },
                from: {
                  type: "string",
                  description: "The username of the sender",
                },
              },
              required: ["username", "from"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully marked messages as read",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: MessageSchema,
              },
            },
          },
        },
        400: {
          description: "Missing username or sender",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};
