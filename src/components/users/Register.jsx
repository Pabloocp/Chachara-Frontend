import { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import logo from "../../assets/img/logo.png"

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved ] = useState("not_registered")
  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;
    const request = await fetch(Global.url + "user/signIn", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await request.json()
    
    if(data.status == "success"){
        setSaved("registered")
    }else{
      setSaved("error")
    }
  };

  return (
    <>
    <div className="content__wrapper">
        <div className="content__main">
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
         {saved == "registered" ? <strong className="alert alert-success">Usuario registrado correctamente</strong>: ""}
         {saved == "error" ? <strong className="alert alert-danger">Usuarios no registrado, revisa el formulario</strong>: ""}
        <form className="registro" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed}></input>
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed}></input>
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={changed}></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" onChange={changed}></input>
          </div>
          <div className="form-group">
            <label htmlFor="passsword">Contraseña</label>
            <input type="password" name="password" onChange={changed}></input>
          </div>

          <input
            type="submit"
            name="btn-registro"
            value="Registrate"
            className="btn btn-success"
          />
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
