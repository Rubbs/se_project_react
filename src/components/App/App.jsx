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

  // Safe state setter
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

  // REGISTER
  const handleRegister = (data) => {
    signup(data)
      .then(() => {
        setTimeout(() => {
          handleLogin({
            email: data.email.trim(),
            password: data.password.trim(),
          });
        }, 800);
        closeActiveModal();
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  // LOGIN
  const handleLogin = (data) => {
    signin(data)
      .then((res) => {
        if (!res.token) return;

        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();

        return checkToken(res.token).then((userRes) => {
          setCurrentUser(userRes);
          return getItems(res.token);
        });
      })
      .then((itemsRes) => {
        if (!itemsRes) return;
        safeSetClothingItems(normalizeItems(itemsRes));
      })
      .catch((err) => console.error("Login failed:", err));
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    safeSetClothingItems([]);
  };

  // CHECK TOKEN ON PAGE LOAD
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        return getItems(token);
      })
      .then((items) => safeSetClothingItems(normalizeItems(items)))
      .catch(() => handleLogout());
  }, []);

  // ADD ITEM
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((item) => {
        safeSetClothingItems((prev) => [item, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add item error:", err));
  };

  // DELETE ITEM
  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        safeSetClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // LIKE / UNLIKE
  const handleCardLike = (card) => {
    if (!card || !card._id) return;

    const token = localStorage.getItem("jwt");
    const isLiked =
      Array.isArray(card.likes) &&
      card.likes.some((id) => String(id) === String(currentUser?._id));

    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(card._id, token)
      .then((updatedItem) => {
        const normalized = {
          _id: updatedItem._id,
          name: updatedItem.name,
          imageUrl: updatedItem.imageUrl,
          weather: updatedItem.weather,
          owner: updatedItem.owner,
          likes: Array.isArray(updatedItem.likes) ? updatedItem.likes : [],
          createdAt: updatedItem.createdAt,
        };

        safeSetClothingItems((prev) =>
          prev.map((i) => (i._id === card._id ? normalized : i))
        );
      })
      .catch((err) => {
        console.error("LIKE error:", err);
        if (String(err).includes("401")) handleLogout();
      });
  };

  // UPDATE PROFILE
  const handleEditProfileSubmit = (data) => {
    const token = localStorage.getItem("jwt");
    updateUserProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // FETCH WEATHER
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // ESC to close modal
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
