import axios from "axios";

export const createSubscription = async (customerId, priceId) => {
  console.log(customerId, priceId, "customerId, priceId");
  return new Promise(async (resolve, reject) => {
    try {
     
      const res = await axios.post(
        "/payments/create-subscription",
        {
          customerId,
          priceId,
        },
        // { headers: headers }
      );
      resolve({
        subscriptionId: res.data.subscriptionId,
        clientSecret: res.data.clientSecret,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const createLifetimeMembershipPaymentIntent = async (customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/payments/create-lifetime-membership", {
        customerId,
      });
      resolve({
        clientSecret: res.data.clientSecret,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const createAPMembershipPaymentIntent = (customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/payments/create-ap-membership", {
        customerId,
      });
      resolve({
        clientSecret: res.data.clientSecret,
      });
    } catch (e) {
      reject(e);
    }
  });
};
