import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [login, setLogin] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "remember") {
      value = !login.remember;
    }
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const currentUser = { name: login.email };
    updateUser("SET_USER", currentUser);
    setLogin({
      email: "",
      password: "",
      remember: false,
    });
    navigate("/appointment");
  };
  return (
    <div>
      <div>
        <div className="form">
          <div className="form-body">
            <div className="email">
              <label className="form__label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={login.email}
                id="email"
                className="form__input"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label className="form__label" htmlFor="password">
                Password:
              </label>
              <input
                className="form__input"
                type="password"
                name="password"
                value={login.password}
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="checkbox" htmlFor="remember">
              Remember me!
            </label>
            <input
              type="checkbox"
              id="remember"
              onChange={handleChange}
              name="remember"
            />
            <p className="login">
              Don't have an account? Register <a href="/register">Here</a>
            </p>
          </div>
          <div className="footer">
            <Button
              type="submit"
              className="btn"
              variant="outline-primary"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
