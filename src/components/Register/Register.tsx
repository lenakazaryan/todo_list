import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { setAuthtab } from "../../redux/ducks/authDuck";
import { AUTH_ROUTES } from "../../redux/helpers/constants";
import "../Register/Register.css";
import { RegisterInterface } from "../../Interface/Register";

const [LOGIN] = AUTH_ROUTES;

function Register() {
  type FormValues = {
    login: string;
    password: string;
  };

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: RegisterInterface) => {
    const users = localStorage.getItem("users");
    if (!users) {
      const json = JSON.stringify([data]);
      localStorage.setItem("users", json);
    } else {
      const parsed = JSON.parse(users);
      parsed.push(data);
      const existingUser = parsed.find((item) => item.login === data.login);
      localStorage.users = JSON.stringify(parsed);
      if (existingUser) {
        console.log("error existingUser");
      }
    }
  };

  const gotoRegister = () => dispatch(setAuthtab(LOGIN));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div>
        <input
          {...register("login", { required: true })}
          placeholder="Login"
          className="inputs"
        />
      </div>
      <div>
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          className="inputs"
        />
      </div>
      <div>
        <input type="submit" value="Register" className="buttons login" />
        <p className="text">OR</p>
        <button onClick={gotoRegister} className="buttons register">
          Go to Login
        </button>
      </div>
    </form>
  );
}

export default Register;
