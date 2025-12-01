import React from "react";
import { useForm } from "../../utils/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSignupClick }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values); //send both email and password to onLogin
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
    >
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default LoginModal;
