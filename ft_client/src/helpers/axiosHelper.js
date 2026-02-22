import axios from "axios";

const apiEP = import.meta.env.VITE_API_URL;

const apiProcessor = async ({ method, url, data, isPrivate = false }) => {
  try {
    const respons = await axios({
      method,
      url,
      data,
      headers: isPrivate
        ? {
            Authorization: localStorage.getItem("accessJWT"),
          }
        : {},
    });
    return respons.data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postUser = (userObj) => {
  return apiProcessor({
    method: "post",
    url: apiEP + "/users",
    data: userObj,
  });
};

export const loginUser = (userObj) => {
  return apiProcessor({
    method: "post",
    url: apiEP + "/auth/login",
    data: userObj,
  });
};

export const fetchTransaction = () => {
  let apiObj = {
    method: "get",
    url: apiEP + "/transactions",
    isPrivate: true,
  };

  return apiProcessor(apiObj);
};

// create transaction
export const postTransaction = (trasactionObject) => {
  return apiProcessor({
    method: "post",
    url: apiEP + "/transactions",
    data: trasactionObject,
    isPrivate: true,
  });
};

// delete Transaction
export const deleteTransactionAPI = (id) => {
  return apiProcessor({
    method: "delete",
    // /api/v1/transactions/12354
    url: apiEP + "/transactions/" + id,
    isPrivate: true,
  });
};

export const deleteTransactionsByIdsAPI = (ids) => {
  return apiProcessor({
    method: "delete",
    // /api/v1/transactions

    // payload
    // {
    // ids: [1,2,3,]
    //}
    url: apiEP + "/transactions",
    data: { ids },
    isPrivate: true,
  });
};

export const fetchUserAPI = () => {
  return apiProcessor({
    method: "get",
    url: apiEP + "/auth/user",
    isPrivate: true,
  });
};
