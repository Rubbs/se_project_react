import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, weatherData }) {
  const itemsToRender =
    weatherData && weatherData.type
      ? clothingItems.filter((item) => item.weather === weatherData.type)
      : clothingItems;

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
