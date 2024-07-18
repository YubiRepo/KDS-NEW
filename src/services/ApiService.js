import axios from "axios";

const API_URL = "http://192.168.1.55:8081";

const apiClient = axios.create({
  baseURL: API_URL, // Ganti dengan base URL dari API Anda
  // headers: {
  //   "Content-Type": "application/json",
  //   "Authorization": "Bearer " + localStorage.getItem("token"),
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Credentials": false,
  //   "Accept": "application/json",
  // },
});

const ApiService = {
  get(endpoint, { params }) {
    return new Promise((resolve, reject) => {
      let queryString = Object?.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");

      apiClient
        .get(`${endpoint}?${queryString}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(handleError(error)));
    });
  },

  post(endpoint, data) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(endpoint, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(handleError(error)));
    });
  },

  put(endpoint, data) {
    return new Promise((resolve, reject) => {
      apiClient
        .put(endpoint, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(handleError(error)));
    });
  },

  delete(endpoint) {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(endpoint)
        .then((response) => resolve(response.data))
        .catch((error) => reject(handleError(error)));
    });
  },
};

function handleError(error) {
  if (error.response) {
    console.error("Server responded with an error:", error.response.data);
    return new Error(
      `Server responded with an error: ${error.response.data.message}`
    );
  } else if (error.request) {
    console.error("No response received from server:", error.request);
    return new Error(
      "No response received from server. Please check your internet connection."
    );
  } else {
    console.error("Error before sending request:", error.message);
    return new Error(`Error before sending request: ${error.message}`);
  }
}

export default ApiService;
