import axiosClient from "./axios.client";

export const userregister = async ({
  username,
  password
}) => {
  try {
    const response = await axiosClient.post(
      "auth/register",
      { username, password }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};

export const userlogin = async ({
  username,
  password
}) => {
  try {
    const response = await axiosClient.post(
      "auth/login",
      { username, password }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};

export const userCheckTkn = async () => {
  try {
    const response = await axiosClient.get("auth/checktoken");

    return { response };
  } catch (err) {
    return { err };
  }
};