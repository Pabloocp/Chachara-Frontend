import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Getprofile } from "../../helpers/Getprofile";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import {RatingStars} from "../publications/RatingStars"
import { PublicationList } from "../publications/PublicationList";
export const Profile = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});
  const [iFollow, setIFollow] = useState(false);
  const [publication, setPubli] = useState([]);
  const [nums, setNums] = useState({});
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);

  const params = useParams();

  // llamamos a helper getprofile que hace consulta a la bdd
  useEffect(() => {
    getDataUser();
    getNums();
    getPublications(1, true);
  }, []);

  useEffect(() => {
    getDataUser();
    getNums();
    getPublications(1, true);
  }, [params]);

  const getDataUser = async () => {
    let dataUser = await Getprofile(params.userId, setUser);
    if (dataUser.following && dataUser.following._id) setIFollow(true);
  };


  const getPublications = async (nextPage = 1, newProfile = false) => {
    const request = await fetch(
      Global.url + "publication/user/" + params.userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();
    console.log(data);

    if (data.status == "success") {
      let newPubli = data.publication;
      if (publication.length >= 1) {
        newPubli = [...publication, ...data.publication];
      }

      if (newProfile) {
        newPubli = data.publication;
        setMore(true);
      }
      setPubli(newPubli);

      console.log(data.publication.length);
      if (publication.length >= data.totalPub - data.publication.length) {
        setMore(false);
      }
    }
  };

 
  const getNums = async () => {
    const request = await fetch(
      Global.url + "user/profileNums/" + params.userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
      setNums(data);
    }
  };
  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/save/", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

    if (data.status === "success") {
      setIFollow(true);
    }
  };

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    console.log(data);
    if (data.status === "success") {
      setIFollow(false);
    }
  };

  return (
    <>
      <section className="layout__content">
        <header className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {user.image == "defualt.png" ? (
                <img
                  src={avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={Global.url + "user/avatar/" + user.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
              <p className="container-names__name">
                <h1>{user.name}</h1>
                {user._id != auth._id &&
                  (iFollow ? (
                    <button
                      className="content__button content__button--right post__button"
                      onClick={() => unfollow(user._id)}
                    >
                      Dejar de seguir
                    </button>
                  ) : (
                    <button
                      className="content__button content__button--right"
                      onClick={() => follow(user._id)}
                    >
                      Seguir
                    </button>
                  ))}
              </p>
              <h2 className="container-names__nickname">{user.nick}</h2>
              <p>{user.bio}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link
                to={"/chachara/siguiendo/" + user._id}
                className="following__link"
              >
                <span className="following__title">Siguiendo</span>
                <span className="following__number">
                  {nums.following >= 1 ? nums.following : 0}
                </span>
              </Link>
            </div>
            <div className="stats__following">
              <Link
                to={"/chachara/seguidores/" + user._id}
                className="following__link"
              >
                <span className="following__title">Seguidores</span>
                <span className="following__number">
                  {nums.followed >= 1 ? nums.followed : 0}
                </span>
              </Link>
            </div>

            <div className="stats__following">
              <Link
                to={"/chachara/perfil/" + user._id}
                className="following__link"
              >
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {nums.publications >= 1 ? nums.publications : 0}
                </span>
              </Link>
            </div>
          </div>
        </header>

        <PublicationList 
                publication={publication}
                getPublications={getPublications} 
                page= {page}
                setPage = {setPage}
                more = {more}
                setMore=  {setMore}
        
        
        ></PublicationList>            
       
        <br />
      </section>
    </>
  );
};
