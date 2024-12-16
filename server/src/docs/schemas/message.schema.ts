export const MessageSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    message: { type: "string" },
    from: { type: "string" },
    to: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    unread: { type: "boolean" },
  },
};
