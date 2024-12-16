import { onlineUsers } from "@src/events/onlineUsers";
import { Request, Response } from "express";
import { IUser } from "src/types/interface";
import bcrypt from "bcrypt";
import { readFileData, writeFileData } from "@src/utils/helper";
import { USER_FILE_PATH } from "@src/config/config";


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: IUser = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const users = await readFileData<Record<string, IUser>>(USER_FILE_PATH,{});

  const user = users[username];

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }


  res.status(200).json({ message: "Login successful" });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password }: IUser = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const users = await readFileData<Record<string, IUser>>(USER_FILE_PATH,{});

  if (users[username]) {
    res.status(409).json({ error: "Username already exists" });
    return;
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] =  { username, password: hashedPassword };;

  await writeFileData(USER_FILE_PATH,users);

  res.status(201).json({ message: "User registered successfully" });
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await readFileData<Record<string, IUser>>(USER_FILE_PATH,{});

     const usersWithStatus = Object.keys(users).map((username) => ({
      username,
      isOnline: onlineUsers.has(username),
    }));

    res.status(200).json(usersWithStatus);

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
