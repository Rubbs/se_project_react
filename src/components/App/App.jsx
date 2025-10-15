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

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Toggle temperature unit
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  // Modal handlers
  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleLoginClick = () => setActiveModal("login");
  const handleRegisterClick = () => setActiveModal("register");
  const closeActiveModal = () => setActiveModal("");
  const handleEditProfileClick = () => setActiveModal("edit-profile");

  // Open login modal from RegisterModal
  const openLoginModal = () => setActiveModal("login");

  // Signup
  const handleRegister = (data) => {
    console.log("Registering user:", data);
    signup(data)
      .then((res) => {
        console.log("Signup response:", res);
        // Wait a little before calling signin
        setTimeout(() => {
          handleLogin({
            email: data.email.trim(),
            password: data.password.trim(),
          });
        }, 1000);
        closeActiveModal(); // close the register modal immediately
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
          checkToken(res.token).then((user) => setCurrentUser(user));
          closeActiveModal(); // Close login modal on successful login
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user.data);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  // Add item
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const newItem = {
      name,
      imageUrl,
      weather,
      createdAt: Date.now(),
      owner: currentUser._id,
    };

    addItem(newItem, token)
      .then((savedItem) => {
        console.log("savedItem from API:", savedItem);
        const normalizedItem = {
          ...savedItem,
          _id: savedItem._id || savedItem.id,
        };
        setClothingItems((prev) => {
          const updatedItems = [
            normalizedItem,
            ...prev.filter((item) => item._id !== normalizedItem._id),
          ];
          console.log("Updated clothingItems after adding:", updatedItems);
          return updatedItems;
        });
        closeActiveModal();
      })
      .catch((err) => {
        console.log("Failed to add item:", err);
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
        console.error("Failed to delete item:", err);
        if (String(err).includes("401")) handleLogout();
      });
  };

  // Like / Unlike item
  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((like) => like === currentUser._id);

    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(_id, token)
      .then((updatedItem) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === _id ? updatedItem : card))
        );
      })
      .catch((err) => {
        console.error("Failed to update like status:", err);
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
      .catch((err) => console.error(err));
  };

  // Fetch weather data on mount
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // Fetch clothing items
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    getItems(token)
      .then((res) => {
        console.log("getItems response:", res);
        console.log("res.data:", res.data);
        console.log("Type of res:", typeof res);

        const items = res ?? [];
        console.log("clothingItems in render:", clothingItems);
        setClothingItems(
          items.map((item) => ({
            ...item,
            _id: item._id || item.id,
          }))
        );
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        if (String(err).includes("401")) handleLogout();
      });
  }, [isLoggedIn]);

  // Close modal on Escape key
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
