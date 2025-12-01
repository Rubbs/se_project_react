// AddItemModal.jsx
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Reset form fields only when modal opens
  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          required
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
          required
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            name="weather"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            name="weather"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            required
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            name="weather"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
