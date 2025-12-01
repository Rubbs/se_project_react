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
  currentUser,
}) {
  console.log("Main component received clothingItems:", clothingItems.length);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Debug weather data and clothing items
  console.log("Main component - clothingItems:", clothingItems);
  console.log("Main component - weatherData:", weatherData);

  // Ensure safe array
  const safeClothingItems = Array.isArray(clothingItems)
    ? clothingItems.filter((item) => item != null)
    : [];

  console.log("✅ Safe clothing items count:", safeClothingItems.length);

  // Filter by matching weather type (case-insensitive)
  const filteredItems = safeClothingItems.filter((item) => {
    if (!item.weather || !weatherData?.type) return false;
    return item.weather.toLowerCase() === weatherData.type.toLowerCase();
  });

  console.log("Filtering for weather type:", weatherData?.type);
  console.log("Filtered items count:", filteredItems.length);
  console.log("Filtered items:", filteredItems);

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
          {filteredItems.map((item) => {
            const likesArray = Array.isArray(item.likes) ? item.likes : [];
            const isLiked = likesArray.some(
              (like) => like === currentUser?._id
            );

            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onDeleteItem={onDeleteItem}
                currentUser={currentUser}
                isLiked={isLiked}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
