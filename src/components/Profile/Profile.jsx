// src/components/Profile/Profile.jsx
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  currentUser,
  onCardClick,
  onAddItem,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <div className="profile">
      {/* Left sidebar */}
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onEditProfileClick={onEditProfileClick}
          onLogout={onLogout}
        />
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
            Add Item
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          currentUser={currentUser}
          onCardClick={onCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
