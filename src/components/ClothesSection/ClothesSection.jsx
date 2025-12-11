// src/components/ClothesSection/ClothesSection.jsx
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  onDeleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userId = currentUser?._id;

  const itemsToRender = clothingItems.filter(
    (item) => String(item.owner) === String(userId)
  );

  return (
    <ul className="clothes-section__items">
      {itemsToRender.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default ClothesSection;
