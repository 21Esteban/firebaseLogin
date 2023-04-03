//Styles
import Styles from "./Home.module.css";
/////////////////////
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

//Funcion para salir

export const Home = (props) => {
  const navigate = useNavigate();

  const salir = () => {
    return auth.signOut();
    navigate("/");
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <div className={Styles.header}>
          <h1>Home</h1>
          <h1 className={Styles.text}>
            <Link to="login">Login</Link>
          </h1>
          <br />
          <h2>
            <Link to="signup">Dont have account? <span>singup.</span> </Link>
          </h2>
        </div>
        <div className={Styles.submit}>
          {" "}
          <h2>{props.username ? `Bienvenido ${props.username}` : "Welcome"}</h2>
          <button onClick={salir}>Sign out</button>
        </div>
      </div>
    </div>
  );
};
