import axios from "axios";

export const api = axios.create({
  baseURL: "https://noble-restaurant-api.onrender.com",
});
