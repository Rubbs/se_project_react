import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

<<<<<<< HEAD
function Profile({
  clothingItems,
  onCardClick,
  onAddItem,
  onEditProfileClick,
}) {
=======
function Profile({ clothingItems, onCardClick, onAddItem }) {
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
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
<<<<<<< HEAD
            className="profile__edit-button"
            type="button"
            onClick={() => onEditProfileClick()}
          >
            Edit Profile
          </button>

          <button
=======
>>>>>>> dd1c90d40792728e8628eb75cb1c2b79bd908349
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
