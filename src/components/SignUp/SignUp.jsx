import React from "react";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SignUpSchema } from "../../Validation/SignUpValidation";

//firebase registro y login
import { auth } from "../../firebase";
//Herramientas de firebase para validar si el usuario es el correcto o no
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { InputControl } from "../inputControl/InputControl";

export const SignUp = () => {
  //navegacion
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  //mensajito de error en tal caso el user ingrese mal los campos
  const [errorMsg, setErrorMsg] = useState("");

  //botoncito que se habilita si el usuario ingresa todos los campos

  const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);

  //Funcionsita para el registro
  const registro = async () => {
    try {
      // if (!values.name || !values.email || !values.password) {
      //   setErrorMsg("Ingrese todos los campos");
      //   return;
      // }

      // if(values.password.length < 6){
      //   setErrorMsg("Password should has more than 6 caracters")
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Something went wrong!',
      //     footer: '<a href="">Why do I have this issue?</a>'
      //   })
      //   return
      // }
      const { username, email, password } = values;
      await SignUpSchema.validate(values);
      setErrorMsg("");
      setSubmitButtonDisable(true);
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(async (res) => {
        setSubmitButtonDisable(false);
        const user = res.user;
        await updateProfile(user, { displayName: values.username });
      });
      navigate("/");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setErrorMsg("Email already in use");
        return;
      }
      setErrorMsg(error.message);

      console.log(error.message);
     
      setErrorMsg(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerbox}>
        <h1 className={styles.heading}>Registro</h1>
        <InputControl
          label="Username"
          placeholder="Username"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, username: event.target.value }))
          }
        />
        <InputControl
          label="Correo"
          placeholder="Set email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Create a Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={registro} >
            Sign up
          </button>
          <p>
            Have Account?
            <span>
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// En este caso, utilizamos el operador spread (...) para copiar todas las propiedades del objeto prevValues en el nuevo objeto que estamos creando. Esto nos permite mantener todas las propiedades anteriores del objeto de estado, y solo actualizar la propiedad específica que cambió. De esta manera, aseguramos que todas las propiedades del objeto values se mantengan en su estado actual, mientras que solo la propiedad que cambió se actualiza con el nuevo valor.

// En resumen, la desestructuración del objeto ...prevValues se utiliza para asegurarnos de que todas las propiedades del objeto de estado se mantengan en su estado actual al actualizar solo una propiedad específica del objeto.
