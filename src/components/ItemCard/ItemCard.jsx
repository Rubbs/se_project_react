import React, { useState } from "react";
import "./ItemCard.css";

function ItemCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className="card">
        <h2 className="card__name">{item.name}</h2>
        <img
          onClick={openModal}
          className="card__image"
          src={item.link}
          alt={item.name}
        />
      </li>

      {isModalOpen && (
        <div className="card__preview" onClick={closeModal}>
          <div
            className="card__modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="card__close-btn" onClick={closeModal}>
              &times;
            </button>
            <img className="card__image" src={item.link} alt={item.name} />
            <div className="card__modal-text">
              <p className="card__title">{item.name}</p>
              <p className="card__weather">Weather: {item.weather}</p>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemCard;
