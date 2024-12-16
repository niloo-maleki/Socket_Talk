import express from "express";
import { getAllUsers, loginUser, registerUser } from "@controllers/auth.controller";
import { getUnread, postReadMessage } from "@controllers/chat.controller";

const router  = express.Router();

router.post('/login', loginUser);
router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.post("/read", postReadMessage);
router.get("/unread", getUnread);

export default router;