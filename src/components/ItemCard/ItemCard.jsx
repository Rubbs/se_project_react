// src/components/ItemCard/ItemCard.jsx
import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const userId = currentUser?._id;

  const isLiked = item.likes?.some((id) => String(id) === String(userId));

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

      {/* Only show like button for logged-in users */}
      {userId && (
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
