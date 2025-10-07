const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

<<<<<<< HEAD
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
=======
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem(item) {
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
<<<<<<< HEAD
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
export const updateUserProfile = (data, token) => {
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
=======
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

function deleteItem(id) {
  console.log("Attempting to delete item with ID:", id);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem };
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
