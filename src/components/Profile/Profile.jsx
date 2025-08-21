import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, weatherData, onAddItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          weatherData={weatherData}
          onAddItem={onAddItem}
        />
      </section>
    </div>
  );
}

export default Profile;
