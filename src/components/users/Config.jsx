import React, { useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";

export const Config = () => {
  const [saved, setSaved] = useState("not_saved");
  const { auth, setAuth } = useAuth();
  const token = localStorage.getItem("token");
  const updateUser = async (e) => {
    e.preventDefault();
  
    let newDataUser = SerializeForm(e.target);
    delete newDataUser.file;
    console.log(JSON.stringify(newDataUser))

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    
    if (data.status == "success" && data.user) {
      console.log(auth)
      setAuth(data.user);
      setSaved("updated");
    } else {
      setSaved("error");
    }

    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      const uploadAvatar = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const uploadData = await uploadAvatar.json();
      console.log(uploadData.status)
      console.log(uploadData.user)
      if (uploadData.status == "success" && uploadData.user) {
        console.log(uploadData.user)
        setAuth(uploadData.user);
        setSaved("updated");
    
      } else {
        setSaved("error");
      }
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Tus Datos</h1>
      </header>
      <div className="content__posts">
        {saved == "updated" ? (
          <strong className="alert alert-success">
            Datos modificados correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">
            Error al cambiar los datos del usuario
          </strong>
        ) : (
          ""
        )}
        <form className="config" onSubmit={updateUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.name}></input>
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input
              type="text"
              name="surname"
              defaultValue={auth.surname}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" defaultValue={auth.nick}></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" defaultValue={auth.email}></input>
          </div>
          <div className="form-group">
            <label htmlFor="passsword">Contraseña</label>
            <input
              type="password"
              name="password"
              defaultValue={auth.password}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea name="bio" defaultValue={auth.bio}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Avatar</label>
            <div className="avatar" >
              {auth.image == "defualt.png" ? (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <br></br>
            <input type="file" name="file" id="file"></input>
          </div>
          <br></br>
          <input
            type="submit"
            name="btn-update"
            value="Actualizar"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
