import api from "@src/api/api";

interface IReadMessages {
  username: string;
  from: string;
}

export const getUnreadMessages = async (username: string) => {
  try {
    const response = await api.get(`/messages/unread`, {
      params: { username },
    });
    return response.data;
  } catch (error: Error | any) {
    console.error(
      "Error fetching unread messages:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const postMarkReadMessages = async (data: IReadMessages) => {
  try {
    const response = await api.post(`/messages/read`, data);
    return response.data;
  } catch (error: Error | any) {
    console.error(
      "Error fetching read messages:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
