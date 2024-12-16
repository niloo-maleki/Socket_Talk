/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@src/api/api";

export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  password: string;
}

export interface IGetAllUsers {
  username: string;
  isOnline: boolean;
}

export const postLoginUser = async (data: ILogin) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const postRegisterUser = async (data: IRegister) => {
  try {
    const response = await api.post("/auth/register", data);

    return response.data;
  } catch (error: Error | any) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const getAllUsers = async (): Promise<IGetAllUsers[]> => {
  try {
    const response = await api.get("/auth/users");
    return response.data;
  } catch (error: Error | any) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
