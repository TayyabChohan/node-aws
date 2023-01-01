import axios from "axios";

export const getCSRFToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/csrftoken");
      axios.defaults.headers.common["X-CSRF-Token"] = response.data.CSRFToken;
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
