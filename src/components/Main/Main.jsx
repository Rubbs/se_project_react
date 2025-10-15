// src/components/Main/Main.jsx
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

  console.log("weatherData.type:", weatherData.type);
  console.log("Available weather types in items:", [
    ...new Set(clothingItems.map((item) => item.weather)),
  ]);

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
          {clothingItems
            .filter((item) => {
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
            })
            .map((item) => (
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
