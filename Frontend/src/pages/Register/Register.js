import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const ConfirmPassword = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (ConfirmPassword.current.value !== password.current.value) {
      ConfirmPassword.current.setCustomValidity("Passwords aren't matching!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            connect with friends all over the world
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="UserName"
              required
              ref={username}
              className="loginInput"
            />

            <input
              type="email"
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
            />

            <input
              type="password"
              placeholder="Password"
              minLength="6"
              required
              ref={password}
              className="loginInput"
            />
            <input
              type="password"
              placeholder="ConfirmPassword"
              required
              ref={ConfirmPassword}
              className="loginInput"
            />
            <button className="loginBtn" type="submit">
              Sign up
            </button>
           
           
            <button className="loginRegisterBTn">
            <Link to="/login">Login into your Account</Link>
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
