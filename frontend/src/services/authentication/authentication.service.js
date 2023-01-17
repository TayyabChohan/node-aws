import axios from "axios";

export const registerRequest = (userObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/register", {
        ...userObj,
      });
      const { user } = res.data;
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};


export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", { email, password })
      .then((res) => {
        const { user } = res.data;
        resolve(user);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const checkForUser = () => {
  return new Promise(async (resolve, reject) => {
    axios
      .get("/authenticated_user")
      .then((res) => {
        const user = res.data;
        resolve(user);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const checkForMod = () => {
  return new Promise(async (resolve, reject) => {
    axios
      .post("/authenticated_mod")
      .then((res) => {
        const user = res.data;
        resolve(user);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const emailInUse = (email) => {
  console.log(email,'email')
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`/validate_email`, {
        email,
      });
      if (res.data.user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

export const profileUrlInUse = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/validate_url", { url });
      if (res.data.user) resolve(true); //url is in use
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

export const logoutRequest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/logout`);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const updateRequest = (fieldValuePairs) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(`/authenticated_user`, {
        fieldValuePairs,
      });
      const updatedUser = res.data;
      resolve(updatedUser);
    } catch (e) {
      reject(e);
    }
  });
};

export const deleteRequest = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleted = await axios.delete("/cancel_subscription");
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const refreshEventRequests = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get("/api/event_requests");
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const requestPasswordReset = (email) => {
  return new Promise(async (resolve, reject) => {
    await axios.post("/request_password_reset", { email });
    //this will always resolve
    resolve();
  });
};

export const resetPassword = (password, resetCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.put("/reset_password", { password, resetCode });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const loginRequestMod = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login_mod", { email, password })
      .then((res) => {
        const { user } = res.data;
        resolve(user);
      })
      .catch((e) => {
        reject(
          "Authentication failed. Please check that your email and password are entered correctly."
        );
      });
  });
};

export const logoutRequestMod = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/logout_mod`);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const refreshMessageThreads = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get("/messagethreads");
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const toggleBlockedStatus = (otherPartyID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put("/change_blocked_status", { otherPartyID });
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const reportUser = (otherParty, reason) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/report_user", { otherParty, reason });
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};
