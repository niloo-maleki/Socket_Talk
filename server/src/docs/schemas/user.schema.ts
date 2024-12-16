export const UserSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
        description: "The user's username",
      },
      password: {
        type: "string",
        description: "The user's password",
      },
    },
  };


  
  