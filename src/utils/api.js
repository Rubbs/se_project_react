const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Get all clothing items
export const getItems = (token) => {
  return fetch(`${baseUrl}/items`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  }).then(checkResponse);
};

// Add a new clothing item
export const addItem = (item, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

// Delete a clothing item
export const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Like clothing item
export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Remove like from clothing item
export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Get current user
export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Update user profile
export const editProfile = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
    }),
  }).then(checkResponse);
};
