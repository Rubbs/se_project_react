import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";

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
      avatar: avatar.avatar || "https://i.pravatar.cc/150?img=3",
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
      buttonText="Sign Up"
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
      />

      <label htmlFor="register-avatar">Avatar URL</label>
      <input
        id="register-avatar"
        type="url"
        placeholder="Avatar URL"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
      />

      <p className="modal__switch">
        or{" "}
        <span className="modal__switch-link" onClick={openLoginModal}>
          Log in
        </span>
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
