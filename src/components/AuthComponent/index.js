import Login from "../Login/Login";
import Register from "../Register/Register";
import { AUTH_ROUTES } from "../../helpers/constants";
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
  console.log("authActiveTab", authActiveTab);

  const component = useMemo(
    () => mainComponent[authActiveTab],
    [authActiveTab]
  );

  return <>{component}</>;
};

export default Auth;
