import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";
import { IChatMessage } from "@src/types/interface";
import { connectSocket, socket } from "@src/socket/socketManager";
import { SOCKET_EVENTS } from "@shared/constants/socketEvents";
import Notification from "./components/Notification";
import { getUnreadMessages } from "@src/services/messageService";

const ChatRoom = () => {
  const username = localStorage.getItem("username");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IChatMessage[]>([]);
  const [newMessages, setNewMessages] = useState<IChatMessage[]>([]);

  useEffect(() => {
    if (!username) return;

    connectSocket(username);

    const fetchUnreadMessages = async () => {
      try {
        const unreadMessages = await getUnreadMessages(username);
        setNewMessages((prev) => [...prev, ...unreadMessages]);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnreadMessages();
  }, [username]);

  useEffect(() => {
    const handleReceivedMessage = (data: IChatMessage) => {
      if (data.from === selectedUser) {
        setChatHistory((prev) => [...prev, data]);
      }
      
      if (!selectedUser || data.from !== selectedUser) {
        setNewMessages((prev) => [...prev, data]);
      }
    };

    const handleChatHistory = (chatHistory: IChatMessage[]) => {
      setChatHistory(chatHistory);
    };

    socket.on(SOCKET_EVENTS.RECEIVED_MESSAGE, handleReceivedMessage);
    socket.on(SOCKET_EVENTS.CHAT_HISTORY, handleChatHistory);

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVED_MESSAGE, handleReceivedMessage);
      socket.off(SOCKET_EVENTS.CHAT_HISTORY, handleChatHistory);
    };
  }, [selectedUser]);

  if (!username) {
    return <div>Please login to access the chat room.</div>;
  }

  const selectUser = (user: string) => {
    setSelectedUser(user);

    socket.emit(SOCKET_EVENTS.JOIN_CHAT, { username, receiver: user });
    setNewMessages((prev) => prev.filter((msg) => msg.from !== user));
  };

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const data: IChatMessage = {
        message,
        from: username,
        to: selectedUser,
      };
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
      setChatHistory((prev) => [...prev, data]);
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white shadow-xl rounded-lg p-8 w-full h-full">
      <div className="flex flex-col justify-center items-start gap-4 h-full w-full">
        <div className="flex items-center gap-2 text-xl font-bold">
          <h1 className="text-pink-500">Welcome, </h1>
          <span className="text-blue-500">{username}</span>
          <Notification isActive />
        </div>
        <div className="grid grid-cols-3 gap-3 items-start h-full w-full">
          <UserList
            selectUser={selectUser}
            selectedUser={selectedUser}
            newMessages={newMessages}
          />
          <div className="flex flex-col h-full col-span-2 shadow-md rounded-md bg-gray-50 p-2 overflow-y-auto">
            {selectedUser ? (
              <ChatBox
                chatHistory={chatHistory || []}
                username={username}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                selectedUser={selectedUser}
              />
            ) : (
              <div className="bg-white p-4 rounded-md shadow-inner h-full">
                <p className="text-gray-500">
                  Select a user to start chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
