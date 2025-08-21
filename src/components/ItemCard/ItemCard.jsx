import React from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteItem }) {
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
