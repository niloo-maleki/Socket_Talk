import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import { useUnreadMessageCount } from "@src/hooks/useUnreadMessageCount";
import { IGetAllUsers, getAllUsers } from "@src/services/authService";
import { postMarkReadMessages } from "@src/services/messageService";
import { socket } from "@src/socket/socketManager";
import { IChatMessage } from "@src/types/interface";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Notification from "./Notification";

interface IUserListProps {
  selectedUser: string | null;
  selectUser: (user: string) => void;
  newMessages: IChatMessage[];
}

const UserList = ({ newMessages, selectUser, selectedUser }: IUserListProps) => {
  const username = localStorage.getItem("username");
  const [allUsers, setAllUsers] = useState<IGetAllUsers[]>([]);
  const { unreadCounts, resetUnreadCount } = useUnreadMessageCount({
    selectedUser,
    newMessages,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (users) {
      setAllUsers(users.filter((user) => user.username !== username));
    }
  }, [users, username]);

  useEffect(() => {
    const handleNewUserRegistered = (newUser: IGetAllUsers) => {
      setAllUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleOnlineUsers = (onlineUsers: IGetAllUsers[]) => {
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          isOnline: onlineUsers.some(
            (onlineUser) => onlineUser.username === user.username
          ),
        }))
      );
    };

    socket.on(SOCKET_EVENTS.NEW_USER_REGISTERED, handleNewUserRegistered);
    socket.on(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);

    return () => {
      socket.off(SOCKET_EVENTS.NEW_USER_REGISTERED, handleNewUserRegistered);
      socket.off(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);
    };
  }, []);

  if (!username) {
    return null;
  }

  const handleSelectUser = async (user: string) => {
    selectUser(user);
    await postMarkReadMessages({ username, from: user });
    resetUnreadCount(user);
  };

  return (
    <div className="flex flex-col h-full gap-2 bg-white shadow-md rounded-md p-4 overflow-y-auto">
      {allUsers.length === 0 ? (
        <p className="text-gray-500 text-center">No Active users</p>
      ) : (
        allUsers.map(({ isOnline, username }) => (
          <button
            key={username}
            onClick={() => handleSelectUser(username)}
            className={`px-4 py-2 rounded-md w-full text-left shadow-sm text-gray-800 ${
              selectedUser === username
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <strong>{username}</strong>
              {unreadCounts[username] > 0 && (
                <span className="text-xs text-red-500 font-bold">
                  {unreadCounts[username]}
                </span>
              )}
              {isOnline && <Notification isActive />}
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default UserList;
