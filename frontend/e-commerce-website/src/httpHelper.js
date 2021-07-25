import axios from "axios";

const endpoint = "http://localhost:8080";

export function get(url) {
  return axios.get(endpoint + url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export function put(url, body) {
  return axios.put(endpoint + url, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export function post(url, body) {
  return axios.post(endpoint + url, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}

export function del(url) {
  return axios.delete(endpoint + url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
}
