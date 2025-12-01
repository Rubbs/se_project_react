import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";
import "./RegisterModal.css"; // add if you haven’t yet

// Registration modal component
const RegisterModal = ({ isOpen, onClose, onRegister, openLoginModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      avatar: values.avatar || "https://i.pravatar.cc/150?img=3",
      email: values.email,
      password: values.password,
    });
  };

  // Render the registration modal
  return (
    <ModalWithForm
      title="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      showButton={false} // Hide default submit button
    >
      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <label htmlFor="register-password">Password</label>
      <input
        id="register-password"
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <label htmlFor="register-name">Name</label>
      <input
        id="register-name"
        type="text"
        placeholder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
        className="modal__input"
      />

      <label htmlFor="register-avatar">Avatar URL</label>
      <input
        id="register-avatar"
        type="url"
        placeholder="Avatar URL"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        className="modal__input"
      />

      <div className="register-modal__actions">
        <button
          type="submit"
          className="register-modal__submit"
          disabled={!values.email || !values.password || !values.name}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="register-modal__switch"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
