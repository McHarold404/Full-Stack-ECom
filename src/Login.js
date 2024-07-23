import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

   const signIn = async (e) => {
     e.preventDefault();
     try {
       const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
       );
       console.log(userCredential);
       if (auth) {
         history("/");
       }
     } catch (error) {
       alert(error.message);
     }
   };

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      if (auth) {
        history("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign in </h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
          <p>
            By signing-in you agree to Amazon's Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice ans our Inrerest-Based
            Ads Notice.
          </p>
          <button onClick={register} className="login__registerButton">
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
