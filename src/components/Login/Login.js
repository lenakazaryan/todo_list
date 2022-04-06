import "../Login/Login.css";
import { useDispatch } from "react-redux";
import { setAuthtab } from "../../redux/ducks/authDuck";
import { AUTH_ROUTES } from "../../helpers/constants";
import { setUser } from "../../redux/ducks/userDuck";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const [, REGISTRATION] = AUTH_ROUTES;
const ERROR_MESSAGE = "Wrong Login or Password";

function Login() {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoRegister = () => dispatch(setAuthtab(REGISTRATION));

  const onSubmit = (data) => {
    const users = localStorage.getItem("users");
    if (!users) {
      console.log("error");
    } else {
      const parsed = JSON.parse(users);
      const currentUser = parsed.find((item) => item.login === data.login);
      if (!currentUser) {
        console.log(ERROR_MESSAGE);
      } else {
        if (currentUser.password === data.password) {
          dispatch(setUser(data));
          sessionStorage.user = JSON.stringify(data);
          navigate("../todos");
        } else {
          console.log(ERROR_MESSAGE);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Log in to see more</h1>
      <div>
        <div>
          <input
            {...register("login", { required: true })}
            placeholder="Login"
            className="inputs"
          ></input>
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="inputs"
          ></input>
        </div>
      </div>
      <div>
        <input type="submit" value="Log In" className="buttons login" />
        <p className="text">OR</p>
        <button onClick={gotoRegister} className="buttons register">
          Go to Register
        </button>
      </div>
    </form>
  );
}

export default Login;
