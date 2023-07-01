import axios from "axios";

const restClient = axios.create({
  baseURL: "https://jlwub6slfi.execute-api.ap-south-1.amazonaws.com/Prod",
});

export default restClient;
