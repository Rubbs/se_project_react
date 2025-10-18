import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {/* User avatar */}
      <img
        src={currentUser?.avatar || avatar}
        alt={currentUser?.name || "Default avatar"}
        className="sidebar__avatar"
      />

      {/* User name */}
      <p className="sidebar__username">{currentUser?.name || "User"}</p>

      {/* Edit Profile button */}
      <button className="sidebar__edit-button" onClick={onEditProfileClick}>
        Edit Profile
      </button>

      {/* Log Out button */}
      <button className="sidebar__logout-button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
