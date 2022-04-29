import Login from "../Login/Login";
import Register from "../Register/Register";
import { AUTH_ROUTES } from "../../redux/helpers/constants";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const [LOGIN, REGISTRATION] = AUTH_ROUTES;

const mainComponent = {
  [LOGIN]: <Login />,
  [REGISTRATION]: <Register />,
};

const authSelector = (state) => state.authReducer;

const Auth = () => {
  const { authActiveTab } = useSelector(authSelector);

  const component = useMemo(
    () => mainComponent[authActiveTab],
    [authActiveTab]
  );

  return <div>{component}</div>;
};

export default Auth;
