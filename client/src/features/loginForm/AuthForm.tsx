import DynamicForm from "@src/components/shared/DynamicForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  ILogin,
  postLoginUser,
  postRegisterUser,
} from "@src/services/authService";
import {
  connectSocket,
  connectSocketForNewUser,
  disconnectSocket,
} from "@src/socket/socketManager";
import { loginSchema, registerSchema } from "@src/schema/validationSchemas";
import { useQueryClient } from "@tanstack/react-query";

interface AuthFormProps {
  mode: "signin" | "signup";
}

const fields = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username...",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
  },
];

const AuthForm = ({ mode }: AuthFormProps) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    disconnectSocket();
    localStorage.clear();
  }, []);

  const handleFormSubmit = async (formData: ILogin) => {
    const schema = mode === "signin" ? loginSchema : registerSchema;

    const result = schema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    const username = formData.username;

    try {
      if (mode === "signin") {
        await postLoginUser(formData);
        localStorage.setItem("username", username);

        connectSocketForNewUser(username);

        navigate("/chatroom");
      } else {
        await postRegisterUser(formData);

        queryClient.invalidateQueries({ queryKey: ["users"] });

        connectSocket(username);

        navigate("/signin");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || `${mode === "signin" ? "Login" : "Register"} failed.`
        );
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center bg-white shadow-xl rounded-lg p-8 w-full lg:w-2/6 max-w-lg h-fit">
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-2xl font-bold text-pink-500">
            {mode === "signin" ? "ChatRoom Sign In" : "Sign Up ChatRoom"}
          </h1>
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-2 text-gray-900 text-sm font-medium">
              <span>
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <button
                className="text-blue-600"
                onClick={() =>
                  navigate(mode === "signin" ? "/signup" : "/signin")
                }
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </div>
            <DynamicForm
              fields={fields}
              buttonText={mode === "signin" ? "Sign in" : "Sign up"}
              onSubmit={handleFormSubmit}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
