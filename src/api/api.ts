import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    "https://interior-planner-api-513969926015.europe-central2.run.app/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
