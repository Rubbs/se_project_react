// src/components/LoginModal/LoginModal.jsx
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css"; // add if you haven’t yet

const LoginModal = ({ isOpen, onClose, onLogin, onSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }); // calls the login handler from App.jsx
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      showButton={false} // Hide default submit button
      containerClassName="login-modal__container"
    >
      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="modal__input"
      />

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="modal__input"
      />

      <div className="login-modal__actions">
        <button
          type="submit"
          className="login-modal__submit"
          disabled={!email || !password}
        >
          Log In
        </button>
        <button
          type="button"
          className="login-modal__switch"
          onClick={onSignupClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
