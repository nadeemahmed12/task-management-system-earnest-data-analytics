import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:5000"

});


// request interceptor

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});



// response interceptor

api.interceptors.response.use(

  (res) => res,

  async (error) => {

    if (error.response?.status === 401) {

      const refreshToken = localStorage.getItem("refreshToken");


      const res = await axios.post(

        "http://localhost:5000/auth/refresh",

        { refreshToken }

      );


      localStorage.setItem(

        "accessToken",
        res.data.accessToken

      );


      error.config.headers.Authorization =
        `Bearer ${res.data.accessToken}`;


      return axios(error.config);

    }

    return Promise.reject(error);

  }

);

export default api;