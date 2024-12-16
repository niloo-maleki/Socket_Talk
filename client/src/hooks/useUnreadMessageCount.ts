import { useEffect, useState } from "react";
import { IChatMessage } from "@src/types/interface";

interface IUnreadMessagesProps {
  selectedUser: string | null;
  newMessages: IChatMessage[];
}

export const useUnreadMessageCount = ({ selectedUser, newMessages }: IUnreadMessagesProps) => {
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
 
  useEffect(() => {
    const counts = newMessages.reduce((acc, msg) => {
      if (msg.from !== selectedUser) {
        acc[msg.from] = (acc[msg.from] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    setUnreadCounts(counts);
  }, [newMessages, selectedUser]);

  const resetUnreadCount = (user: string) => {
    setUnreadCounts((prev) => ({ ...prev, [user]: 0 }));
  };

  return { unreadCounts, resetUnreadCount };
};
