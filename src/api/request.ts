import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../common/constants";
import { setLoading } from "../store/modules/loading/actions";

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 123",
  },
});

instance.interceptors.request.use(config => {
  setLoading(true);
  return config;
});
instance.interceptors.response.use(response => {
  setLoading(false);
  return response.data;
});

instance.interceptors.response.use(undefined, error => {
  Swal.fire({
    icon: "info",
    iconColor: "#da4c4c",
    text: error.response.data.error,
    showConfirmButton: false,
    showCloseButton: true,
  });
});

export default instance;
