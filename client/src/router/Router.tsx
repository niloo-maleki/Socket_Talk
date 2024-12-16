import ChatRoom from "@src/features/ChatRoom";
import Signin from "@src/features/loginForm/SignIn";
import SignUp from "@src/features/loginForm/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/chatroom" element={<ChatRoom />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
