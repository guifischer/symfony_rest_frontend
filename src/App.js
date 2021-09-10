import React, { useState, useEffect, useGlobal } from "reactn";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import Register from "./components/Register";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Wrapper from "./components/Wrapper";
import { useRef } from "react";

require("dotenv").config();

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token == null) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { flashInfo: "Please log in to continue." },
              }}
            />
          );
        } else {
          return (
            <Wrapper>
              <Component {...props} token={token} />
            </Wrapper>
          );
        }
      }}
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useGlobal("token");
  const isFirstRender = useRef(true);

  const setInitialToken = async () => {
    const tokenString = await sessionStorage.getItem("token");

    setToken(tokenString);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setInitialToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Users} token={token} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
