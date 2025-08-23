import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onCardClick, onAddItem }) {
  return (
    <div className="profile">
      {/* Left sidebar */}
      <section className="profile__sidebar">
        <SideBar />
      </section>

      {/* Right main content */}
      <section className="profile__main">
        <div className="profile__header">
          <p className="profile__title">Your items</p>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddItem}
          >
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
