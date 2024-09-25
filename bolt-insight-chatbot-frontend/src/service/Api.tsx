import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": 'application/json',
  },
});

// interceptor to catch errors
const errorInterceptor = (error: any) => {
  // check if it's a server error
  if (!error.response) {
    // notify.warn('Network/Server error');
    return Promise.reject(error);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400: // bad request
      toast.error("(System Error) - Bad Request " + error.response.data.message);
      break;
    case 401: // authentication error, logout the user
        toast.error("(System Error) - Unauthorized: Authentication " + error.response.data.message);
      break;
    case 403: // forbidden
        toast.error("(System Error) - Forbidden " + error.response.data.message);
      break;
    case 404: // not found
      toast.error("(System Error) - Not Found " + error.response.data.message);
      break;
    case 500: // server error
      toast.error("(System Error) - Internal Server Error " + error.response.data.message);
      break;
    default:
      toast.error("(System Error) - Error" + error.response.data.message);
  }

  return Promise.reject(error);
}

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
}

api.interceptors.response.use(responseInterceptor, (error) => errorInterceptor(error));

export default api;