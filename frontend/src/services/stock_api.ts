import { User } from "@/models/user.model";
import router from "@/router";
import { server } from "./constants";
import httpClient from "./httpClient";

const getProducts = async () => {
  return [1, 2, 3];
};

export default {
  getProducts,
};
