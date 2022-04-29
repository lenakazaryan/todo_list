import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import Header from "./components/Header/Header";
import AuthComponent from "./components/AuthComponent/index";
import Profile from "./components/Profile/Profile";
import "./App.css";
import React, { useEffect } from "react";

const userSelector = (state) => state.userReducer;

const App: React.FC = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("auth");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="todos" element={<TodoContainer />} />
        <Route path="auth" element={<AuthComponent />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
