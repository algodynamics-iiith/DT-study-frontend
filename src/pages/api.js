import axios from "axios";

const client = axios.create({
  // baseURL: "https://lepkbux71j.execute-api.ap-south-1.amazonaws.com/Prod",
  baseURL: "http://127.0.0.1:3000", //Fact url localhost. Replace with amazon aws link.
});

export default client;
