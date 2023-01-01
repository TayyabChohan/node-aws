import axios from "axios";

export const geocodeRequest = (addressObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`/geocode`, addressObj);
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};
