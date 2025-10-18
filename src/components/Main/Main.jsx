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
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // ✅ Step 1: Create a safe, cleaned-up array
  const safeClothingItems = Array.isArray(clothingItems)
    ? clothingItems.filter((item) => item != null)
    : [];

  // ✅ Step 2: Add debugging logs to compare
  console.log("Original clothingItems:", clothingItems);
  console.log("Safe clothingItems:", safeClothingItems);
  console.log(
    "Any undefined items?",
    clothingItems.some((item) => item == null)
  );
  console.log(
    "Items without weather property:",
    safeClothingItems.filter((item) => !item.weather)
  );
  console.log("weatherData.type:", weatherData.type);
  console.log("Available weather types in items:", [
    ...new Set(
      safeClothingItems
        .filter((item) => item.weather)
        .map((item) => item.weather)
    ),
  ]);

  // ✅ Step 3: Use the safe array everywhere
  const filteredItems = safeClothingItems.filter((item) => {
    if (!item.weather) return false; // Skip items missing weather data

    if (weatherData.type === "warm") {
      return item.weather === "warm" || item.weather === "hot";
    }
    if (weatherData.type === "hot") {
      return item.weather === "hot";
    }
    if (weatherData.type === "cold") {
      return item.weather === "cold";
    }
    return false;
  });

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
              currentUser={currentUser}
              isLiked={item.likes.some(
                (like) => like === currentUser?.data?._id
              )}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
