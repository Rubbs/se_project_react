import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sideBar">
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
