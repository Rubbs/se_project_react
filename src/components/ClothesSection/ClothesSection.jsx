// src/components/ClothesSection/ClothesSection.jsx
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, currentUser }) {
  const itemsToRender = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <ul className="clothes-section__items">
      {itemsToRender.map((item, index) => (
        <ItemCard
          key={item._id || item.id || index}
          item={item}
          onCardClick={onCardClick}
        />
      ))}
    </ul>
  );
}

export default ClothesSection;
