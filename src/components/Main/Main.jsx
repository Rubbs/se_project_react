import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onDeleteItem,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Ensure safe array
  const safeClothingItems = Array.isArray(clothingItems)
    ? clothingItems.filter(Boolean)
    : [];

  // Grab weather type safely
  const weatherType = weatherData?.type?.toLowerCase();

  // If weather not loaded → show ALL items
  const filteredItems = weatherType
    ? safeClothingItems.filter(
        (item) => item.weather?.toLowerCase() === weatherType
      )
    : safeClothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="card__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
