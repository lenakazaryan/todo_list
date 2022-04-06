import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Header/Header.css";

const userSelector = (state) => state.userReducer;

function Header() {
  const { user } = useSelector(userSelector);
  console.log("user", user);

  return (
    <div className="header">
      {user && (
        <NavLink className="item" to="todos">
          Todos
        </NavLink>
      )}
      {!user && (
        <NavLink className="item" to="auth">
          Auth
        </NavLink>
      )}
      {user && (
        <NavLink className="item" to="profile">
          My Profile
        </NavLink>
      )}
    </div>
  );
}

export default Header;
