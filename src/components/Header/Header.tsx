import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Header/Header.css";
import { iUserReducerInterface } from "../../redux/Interfaces/userReducer";

//const userSelector = (state: userReducerInterface) => state.user;

function Header() {
  const user = useSelector(
    (state: iUserReducerInterface) => state.userReducer?.user
  );

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
