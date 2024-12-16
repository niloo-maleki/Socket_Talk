import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import Layout from "@src/features/layout/Layout";
import { socket } from "@src/socket/socketManager";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username && !socket.connected) {
      socket.connect();
      socket.emit(SOCKET_EVENTS.REGISTER_USER,  username );
    }
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!username) {
    localStorage.clear();
    return <Navigate to="/signin" />;
  }

  return (
    <Layout>
      <Outlet context={{ username }} />
    </Layout>
  );
};

export default ProtectedRoutes;
