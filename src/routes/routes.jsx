import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Home } from "../components/Home/Home";
import { SignUp } from "../components/SignUp/SignUp";
import { NotFound } from "../components/NotFound/NotFound";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export const MyRoutes = () => {
  const [userName, setUserName] = useState([]);

  //vamos a ejecutar un useEffect para verificar si el usuario esta logueado o no

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
      }else setUserName("")
  })
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home username={userName}/>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        {/* Ruta no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
