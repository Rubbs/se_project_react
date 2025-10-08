import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
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
      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_liked" : ""
        }`}
        onClick={handleLikeClick}
        type="button"
        aria-label="Like button"
      ></button>
    </li>
  );
}

export default ItemCard;
