import axios from "axios";

const client = axios.create({
  baseURL: "https://lepkbux71j.execute-api.ap-south-1.amazonaws.com/Prod",
});

export default client;
