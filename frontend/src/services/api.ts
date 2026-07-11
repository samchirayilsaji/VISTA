import axios from "axios";

export const api = axios.create({
  baseURL: "https://vista-api-g4vb.onrender.com",
});