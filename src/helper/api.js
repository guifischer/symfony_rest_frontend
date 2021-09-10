import axios from "axios";
import { server } from "./env";

export const GET = async (url) => {
  try {
    let token = sessionStorage.getItem("token");

    const params = { headers: { Authorization: token } };
    const response = await axios.get(server + url, params);

    return response;
  } catch (error) {
    if (error.response.data != null && error.response.data.message == "API token expired") {
      alert("Token Expired. Refreshing it...");
      refreshToken();
    }

    return error;
  }
};

const refreshToken = async () => {
  try {
    let token = sessionStorage.getItem("token");
    let refresh_token = localStorage.getItem("refresh_token");

    const response = await axios.post(server + "refresh", { refresh_token: refresh_token, token: token });

    sessionStorage.setItem("token", response.data.token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    window.location.reload();
  } catch (error) {}
};
