import { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logo.png";

export const Login = () => {
  const { form, changed } = useForm({});
  const [logued, setLogued] = useState("not_logued");
  const { auth, setAuth } = useAuth();
  const LoginUser = async (e) => {
    e.preventDefault();
    let userCredentials = form;
    const request = await fetch(Global.url + "user/logIn", {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      //guardamos el token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLogued("logued");
      setAuth(data.user);
      //Redirección
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setLogued("error");
    }
  };
  return (
    <>
      <div className="content__wrapper">
        <div className="content__main">
          <header className="content__header content__header--public">
            <h1 className="content__title">Login</h1>
          </header>
          <div className="content__posts">
            {logued == "logued" ? (
              <strong className="alert alert-success">
                Usuario logueado correctamente
              </strong>
            ) : (
              ""
            )}
            {logued == "error" ? (
              <strong className="alert alert-danger">
                Usuario no registrado,intentelo de nuevo o registrese primero
              </strong>
            ) : (
              ""
            )}
            <form className="registro" onSubmit={LoginUser}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={changed}></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  onChange={changed}
                ></input>
              </div>

              <input type="submit" value="LogIn" className="btn btn-success" />
            </form>
          </div>
          <div className="content__sidebar">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};
