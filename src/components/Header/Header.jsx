import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useContext } from "react";
=======
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
<<<<<<< HEAD
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

=======

function Header({ handleAddClick, weatherData }) {
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
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

<<<<<<< HEAD
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
              <Link to="/profile" className="headerlink">
                <div className="headeruser-container">
                  <p className="headerusername">{currentUser?.name || ""}</p>
                  <img
                    src={currentUser?.avatar || avatar}
                    alt={currentUser?.name || "User Avatar"}
                    className="headeravatar"
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
=======
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">Terrence Tegegne</p>
              <img
                src={avatar || avatarDefault}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </div>
          </Link>
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
        </div>
      </div>
    </header>
  );
}

export default Header;
