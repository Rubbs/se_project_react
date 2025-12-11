// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { signup, signin, checkToken } from "../../utils/auth";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// Normalize initial item data
const normalizeItems = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item != null)
    .map((item) => ({
      _id: item._id,
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
      likes: Array.isArray(item.likes) ? item.likes : [],
      owner: item.owner,
      createdAt: item.createdAt,
    }));
};

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Safely update clothing items state
  const safeSetClothingItems = (updater) => {
    setClothingItems((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      return updated.filter(Boolean);
    });
  };

  // Temperature toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Modal controls
  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("register");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");

  // Register
  const handleRegister = (data) => {
    console.log("Registration data:", data);

    signup(data)
      .then((res) => {
        console.log("Signup successful:", res);

        if (!res || !res.data || !res.data.email) {
          console.error("Signup failed: missing response data");
          return;
        }

        // Delay auto-login
        setTimeout(() => {
          handleLogin({
            email: data.email.trim(),
            password: data.password.trim(),
          });
        }, 500);

        closeActiveModal();
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  // Login
  const handleLogin = (data) => {
    signin(data)
      .then((res) => {
        if (!res.token) return;

        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();

        return checkToken(res.token).then((userRes) => {
          setCurrentUser(userRes.data);

          return getItems(res.token);
        });
      })
      .then((itemsRes) => {
        if (!itemsRes) return;
        safeSetClothingItems(normalizeItems(itemsRes));
      })
      .catch((err) => console.error("Login failed:", err));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    safeSetClothingItems([]);
  };

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
        return getItems(token);
      })
      .then((items) => safeSetClothingItems(normalizeItems(items)))
      .catch(() => handleLogout());
  }, []);

  // Add item
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((item) => {
        safeSetClothingItems((prev) => [item, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add item error:", err));
  };

  // Delete item
  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        safeSetClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // Like / Unlike item
  function handleCardLike(card) {
    console.log("🔍 Current user object:", currentUser);

    //  Correct userId structure
    const userId = currentUser?._id || "";

    //  Check if already liked
    const isLiked =
      Array.isArray(card.likes) &&
      card.likes.some((like) => String(like) === String(userId));

    const token = localStorage.getItem("jwt");

    //  Decide which API call to make
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(card._id, token)
      .then((updatedItem) => {
        console.log("❤️ Updated item from backend:", updatedItem);

        // Normalize the updated item
        const normalized = {
          _id: updatedItem._id,
          name: updatedItem.name,
          imageUrl: updatedItem.imageUrl,
          weather: updatedItem.weather,
          owner: updatedItem.owner,
          likes: Array.isArray(updatedItem.likes) ? updatedItem.likes : [],
          createdAt: updatedItem.createdAt,
        };

        // Update state with new liked/unliked item
        safeSetClothingItems((prev) =>
          prev.map((i) => (i._id === card._id ? normalized : i))
        );
      })
      .catch((err) => {
        console.error("LIKE error:", err);
        if (String(err).includes("401")) handleLogout();
      });
  }

  // Update profile
  const handleEditProfileSubmit = (data) => {
    console.log("🔧 Profile data being sent to backend:", data);

    const token = localStorage.getItem("jwt");

    updateUserProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser.data);
        closeActiveModal();
      })
      .catch((err) => console.error("PROFILE UPDATE ERROR:", err));
  };

  // Fetch weather data on load
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // Close modals on ESC key
  useEffect(() => {
    if (!activeModal) return;
    const onEsc = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              handleLogout={handleLogout}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onDeleteItem={handleDeleteItem}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={
                      <Profile
                        currentUser={currentUser}
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddItem={handleAddClick}
                        onEditProfileClick={handleEditProfileClick}
                        onLogout={handleLogout}
                        onCardLike={handleCardLike}
                        onDeleteItem={handleDeleteItem}
                      />
                    }
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
          {/* Modals */}
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            openLoginModal={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSignupClick={handleRegisterClick}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
            currentUser={currentUser}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfile={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
