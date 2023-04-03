import styles from "./Login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputControl } from "../inputControl/InputControl";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

//Validacion

import { loginSchema } from "../../Validation/LoginValidation";

export const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  //Funcion login

  const Loguearse = async () => {
    // if(!values.email ||!values.password){
    //   setErrorMsg("Completa todos los campos")
    //   return
    // }

    try {
      await loginSchema.validate(values);
      setErrorMsg("");
      setSubmitButtonDisable(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/user-not-found"
      ) {
        setErrorMsg("Invalid username or Password");
      } else {
        setErrorMsg(error.message);
        // setSubmitButtonDisable(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl
          label="Email"
          onChange={(event) =>
            setValues({ ...values, email: event.target.value })
          }
          placeholder="Email"
        />
        <InputControl
          label="password"
          onChange={(event) =>
            setValues({ ...values, password: event.target.value })
          }
          placeholder="Password"
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={Loguearse} >
            Login
          </button>
          <p>
            Create account
            <span>
              <Link to="/signup">signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

//Validacion

// La validación se realiza llamando al método validate() del esquema de validación loginSchema, pasándole los valores del formulario como argumento. Si la validación es exitosa, es decir, si los valores cumplen con las reglas de validación definidas en el esquema, la promesa se resuelve y se ejecuta el código dentro del then(). De lo contrario, si hay algún error de validación, la promesa se rechaza y se ejecuta el código dentro del catch(), donde estableces el mensaje de error a través de setErrorMsg().

// En general, la implementación de la validación parece correcta, aunque dependiendo de tus necesidades específicas, quizás quieras considerar agregar más mensajes de error para cada campo de entrada del formulario.
