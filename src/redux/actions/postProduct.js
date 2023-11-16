import axios from "axios";

export function postProduct(payload) {
  return async function () {
    const response = await axios.post(`/api/products/create`, payload);
    return response;
  };
}
