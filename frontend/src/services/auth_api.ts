import { User } from "@/models/user.model";
import router from "@/router";
import { server } from "./constants";
import httpClient from "./httpClient";

const login = async (values: User) => {
  const result = await httpClient.post(server.LOGIN_URL, values);
  if (result.data.result == "ok") {
    localStorage.setItem(server.USERNAME, values.username);
    localStorage.setItem(server.TOKEN_KEY, result.data.token);
    router.push("/stock");
    return true;
  } else {
    alert("login failed");
    return false;
  }
};

const register = async (values: User) => {
  const result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "ok") {
    router.push("/login");
    return true;
  } else {
    return false;
  }
};

export default {
  login,
  register,
};
