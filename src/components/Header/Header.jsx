import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleLoginClick,
  handleRegisterClick,
  handleLogout,
  weatherData,
  isLoggedIn,
}) {
  // Get the current user from context instead of props
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" alt="what to wear logo" src={logo} />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>

        <div className="header__nav">
          <ToggleSwitch className="ToggleSwitch" />

          {!isLoggedIn ? (
            <>
              <button
                onClick={handleRegisterClick}
                type="button"
                className="header__register-btn"
              >
                Sign up
              </button>
              <button
                onClick={handleLoginClick}
                type="button"
                className="header__login-btn"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              <Link to="/profile" className="header__link">
                <div className="header__user-container">
                  <p className="header__username">{currentUser?.name || ""}</p>
                  <img
                    src={currentUser?.avatar || avatar}
                    alt={currentUser?.name || "User Avatar"}
                    className="header__avatar"
                  />
                </div>
              </Link>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>

              <button
                onClick={handleLogout}
                type="button"
                className="header__logout-btn"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
