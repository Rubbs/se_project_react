// src/components/ItemCard/ItemCard.jsx
import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
  const currentUser = useContext(CurrentUserContext);

  const handleLikeClick = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={`card__like-button ${
            isLiked ? "card__like-button_liked" : ""
          }`}
          onClick={handleLikeClick}
          type="button"
          aria-label="Like button"
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
