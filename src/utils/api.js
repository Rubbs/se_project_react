import { BASE_URL } from "./config";

// Universal response handler
export const checkResponse = (res) => {
  return res.json().then((body) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    return body; // backend returns raw object
  });
};

// Helper for Authorization header
const authHeader = (token, extra = {}) =>
  token ? { Authorization: `Bearer ${token}`, ...extra } : extra;

// GET all clothing items
export const getItems = (token) => {
  return fetch(`${BASE_URL}/items`, {
    headers: authHeader(token),
  }).then(checkResponse);
};

// ADD a new item
export const addItem = (item, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: authHeader(token, { "Content-Type": "application/json" }),
    body: JSON.stringify(item),
  }).then(checkResponse);
};

// DELETE an item
export const deleteItem = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  }).then(checkResponse);
};

// LIKE item
export const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: authHeader(token),
  }).then(checkResponse);
};

// UNLIKE item
export const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: authHeader(token),
  }).then(checkResponse);
};

// GET current user
export const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: authHeader(token),
  }).then(checkResponse);
};

// UPDATE user profile
export const updateUserProfile = (data, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: authHeader(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
    }),
  }).then(checkResponse);
};
