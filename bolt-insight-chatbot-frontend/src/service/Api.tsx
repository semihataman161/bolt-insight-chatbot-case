import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// interceptor to catch errors
const errorInterceptor = (error: any) => {
  // check if it's a server error
  if (!error.response) {
    return Promise.reject(error);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400: // bad request
      toast.error("Bad request: " + error.response.data.message);
      break;
    case 401: // authentication error
      toast.error(
        "Unauthorized authentication: " + error.response.data.message
      );

      if (window.location.pathname !== "/login") {
        // Redirect to login page
        window.location.href = "/login";
      }
      break;
    case 403: // forbidden
      toast.error("Forbidden: " + error.response.data.message);
      
      if (window.location.pathname !== "/login") {
        // Redirect to login page
        window.location.href = "/login";
      }
      break;
    case 404: // not found
      toast.error("Not found: " + error.response.data.message);
      break;
    case 500: // server error
      toast.error("Internal server error: " + error.response.data.message);
      break;
    default:
      toast.error("Error: " + error.response.data.message);
  }

  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response: any) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
};

api.interceptors.response.use(responseInterceptor, (error) =>
  errorInterceptor(error)
);

export default api;
