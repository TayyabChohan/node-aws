import axios from "axios";

export const sendNewMessage = (message, recipientID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/new_message_thread", {
        message,
        recipientID,
      });
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const replyToThread = (newMessage, threadID, recipientID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put("/respond_to_message", {
        newMessage,
        threadID,
        recipientID,
      });
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const setHasRead = (threadID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put("/set_read_status", { threadID });
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};
