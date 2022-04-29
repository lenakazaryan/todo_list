import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/ducks/userDuck";
//import profilePicture from "../../assets/images/prof-pic.jpg";
import "./Profile.css";

const profilePicture =  require("../../assets/images/p-pic.jpg")
const userSelector = (state) => state.userReducer;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);

  const logOut = () => {
    navigate("../auth");
    dispatch(setUser(null));
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <img className="profile-picture" src={profilePicture} />
        <h3>USERNAME : {user.login}</h3>
      </div>
      <input
        type="button"
        value="Log out"
        onClick={logOut}
        className="log-out"
      />
    </div>
  );
};

export default Profile;
