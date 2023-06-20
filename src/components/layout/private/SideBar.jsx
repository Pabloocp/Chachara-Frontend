import { Link, NavLink } from "react-router-dom";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import { RatingSelector } from "../../publications/RatingSelector";
export const SideBar = () => {
  const { auth, nums } = useAuth();
  const { form, changed } = useForm({});
  const [rating, setRating] = useState(1);
  const [stored, setStored] = useState("not_stored");
  const token = localStorage.getItem("token");
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const savePublication = async (e) => {
    e.preventDefault();
    let newPublication = form;
    newPublication.user = auth._id;
    newPublication.rate = rating;
    console.log(newPublication);
    const request = await fetch(Global.url + "publication/save/", {
      method: "POST",
      body: JSON.stringify(newPublication),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();

    if (data.status == "success") {
      setStored("stored");
    } else {
      setStored("error");
    }

    const fileInput = document.querySelector("#file");
    if (data.status == "success" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
     
      const uploadrequest = await fetch(
        Global.url + "publication/upload/" + data.savedPubli._id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: token,
          },
        }
      );
      const uploadData =  await uploadrequest.json();
      if (uploadData.status == "sucess") {
        setStored("stored");
      } else {
        setStored("error");
      }

    }
      const myForm= document.querySelector("#publiForm")
      myForm.reset()
      window.location.reload();
  };

  return (
    <>
      <aside className="layout__aside">
        <header className="aside__header">
          <h1 className="aside__title">Hola, {auth.name}</h1>
        </header>

        <div className="aside__container">
          <div className="aside__profile-info">
            <div className="profile-info__general-info">
              <div className="general-info__container-avatar">
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

              <div className="general-info__container-names">
                <NavLink to={"/chachara/perfil/" + auth._id}className="container-names__name">
                  {auth.name} {auth.surname}
                </NavLink>
                <p className="container-names__nickname">{auth.nick}</p>
              </div>
            </div>

            <div className="profile-info__stats">
              <div className="stats__following">
                <Link to={"siguiendo/" + auth._id} className="following__link">
                  <span className="following__title">Siguiendo</span>
                  <span className="following__number">{nums.following}</span>
                </Link>
              </div>
              <div className="stats__following">
                <Link to={"seguidores/" + auth._id} className="following__link">
                  <span className="following__title">Seguidores</span>
                  <span className="following__number">{nums.followed}</span>
                </Link>
              </div>

              <div className="stats__following">
                <NavLink to={"/chachara/perfil/" + auth._id} className="following__link">
                  <span className="following__title">Publicaciones</span>
                  <span className="following__number">{nums.publications}</span>
                </NavLink>
              </div>
            </div>
          </div>

          <div className="aside__container-form">
            {stored == "stored" ? (
              <strong className="alert alert-success">
                Publicación subida correctamente
              </strong>
            ) : (
              ""
            )}
            {stored == "error" ? (
              <strong className="alert alert-danger">
                Error al subir tu publicación
              </strong>
            ) : (
              ""
            )}
            <form
              className="container-form__form-post"
              onSubmit={savePublication} id="publiForm"
            >
              <div className="form-post__inputs">
                <label htmlFor="text" className="form-post__label">
                  ¿Que te ha gustado últimamente?
                </label>
                <textarea
                  name="text"
                  className="form-post__textarea"
                  onChange={changed}
                ></textarea>
              </div>

              <div className="form-post__inputs">
                <label htmlFor="image" className="form-post__label">
                  Sube tu foto
                </label>
                <input type="file" id="file" name="file" className="form-post__image" />
              </div>
              <RatingSelector
                name="ratingSelector"
                type="number"
                onChange={handleRatingChange}
              />

              <br></br>
              <input
                type="submit"
                value="Enviar"
                className="form-post__btn-submit"
              />
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};
