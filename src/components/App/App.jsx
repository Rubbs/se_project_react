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

// Normalize API items to ensure consistency
const normalizeItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    _id: item._id || item.id,
    name: item.name || "",
    imageUrl: item.imageUrl || item.image || "",
    weather: item.weather || "",
    likes: Array.isArray(item.likes) ? item.likes : [],
    owner: item.owner || null,
    createdAt: item.createdAt || Date.now(),
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

  // Temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Modal handlers
  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("register");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const openLoginModal = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  // Register
  const handleRegister = (data) => {
    signup(data)
      .then(() => {
        // Auto login after registration
        setTimeout(() => {
          handleLogin({
            email: data.email.trim(),
            password: data.password.trim(),
          });
        }, 1000);
        closeActiveModal();
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  // Login
  const handleLogin = (data) => {
    signin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();

          // Verify token → fetch user → fetch items
          return checkToken(res.token).then((userRes) => {
            setCurrentUser(userRes.data);
            return getItems(res.token);
          });
        }
      })
      .then((itemsRes) => {
        if (itemsRes) {
          const normalizedItems = normalizeItems(itemsRes);
          setClothingItems(normalizedItems);
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
  };

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
        return getItems(token);
      })
      .then((res) => {
        const normalizedItems = normalizeItems(res);
        setClothingItems(normalizedItems);
      })
      .catch(() => handleLogout());
  }, []);

  // Add item
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const newItem = {
      name,
      imageUrl,
      weather,
      createdAt: Date.now(),
      owner: currentUser?._id,
    };

    addItem(newItem, token)
      .then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => {
        if (String(err).includes("401")) handleLogout();
      });
  };

  // Delete item
  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        if (String(err).includes("401")) handleLogout();
      });
  };

  // Like / Unlike item
  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((like) => like === currentUser?._id);

    const likeAction = isLiked ? removeCardLike : addCardLike;
    likeAction(_id, token)
      .then((updatedItem) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === _id ? updatedItem.data : card))
        );
      })
      .catch((err) => {
        if (String(err).includes("401")) handleLogout();
      });
  };

  // Edit profile
  const handleEditProfileSubmit = (data) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // Close modals on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
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
                      />
                    }
                  />
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* Modals */}
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            openLoginModal={openLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
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
