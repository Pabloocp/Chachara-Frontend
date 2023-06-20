import React from "react";
import { RatingStars } from "../publications/RatingStars";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
export const PublicationList = ({publication, getPublications,page,setPage,more,setMore}) => {

const { auth } = useAuth();
  const nextPgs = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };

  const deletePublication = async (publiID) => {
    const request = await fetch(Global.url + "publication/remove/" + publiID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    setPage(1);
    setMore(true);
    getPublications(1, true);
  };
  return (
    <>
      <div className="content__posts">
        <p className="publi">Publicaciones</p>
        <br />

        {publication.length < 1 && (
          <>
            <br></br>
            <h3>No hay publicaciones</h3>
          </>
        )}
        {publication.map((pb) => {
          return (
            <article className="posts__post" key={pb.user.nick}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/chachara/perfil/" + pb.user._id}
                    className="post__image-link"
                  >
                    {pb.user.image == "defualt.png" ? (
                      <img
                        src={avatar}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    ) : (
                      <img
                        src={Global.url + "user/avatar/" + pb.user.image}
                        className="container-avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link
                      to={"/chachara/perfil/" + pb.user._id}
                      className="user-info__name"
                    >
                      {pb.user.name}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link
                      to={"/chachara/perfil/" + pb.user._id}
                      className="user-info__name"
                    >
                      {pb.user.nick}
                    </Link>
                  </div>

                  <h4 className="post__content">{pb.text}</h4>
                  {pb.file && (
                    <img src={Global.url + "publication/media/" + pb.file} />
                  )}
                  <div className="stars">
                    <RatingStars rating={pb.rate} />
                  </div>
                </div>
              </div>
              {auth._id == pb.user._id && (
                <div className="post__buttons">
                  <button
                    className="post__button"
                    onClick={() => deletePublication(pb._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>{" "}
      {publication.length >= 1 && more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPgs}>
            Ver mas publicaciones
          </button>
        </div>
      )}
    </>
  );
};
