import { Link } from "react-router-dom";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const UserList = ({users, setUsers, following, setFollowing,more,page,setPage}) => {
  const { auth } = useAuth();
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
  };
  const previousPage = () => {
    if (page - 1 >= 1) {
      let next = page - 1;
      setPage(next);
    } else {
      setPage(1);
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
      if (!following.includes(userId)) setFollowing(...following, userId);
    }
    window.location.reload();
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
    if (data.status === "success") {
      const filtrar = following.filter(
        (followingUserId) => userId !== followingUserId
      );
      setFollowing(filtrar);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="content__posts">
        {users.map(user => {
          return (
            <article className="posts__post " key={user.nick}>
              <div className="post__container">
                <div className="post__image-user">
                  {/* Linkeamos a los perfiles de los usuarios con sus fotos y nombres*/}
                  <Link to={"/chachara/perfil/"+ user._id} className="post__image-link">
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
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link to={"/chachara/perfil/"+ user._id}  className="user-info__name">
                      {user.name}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={"/chachara/perfil/"+ user._id}  className="user-info__create-date">
                      @{user.nick}
                    </Link>
                  </div>

                  <p className="post__content">
                    {!user.bio ? "No bio yet" : user.bio}
                  </p>
                </div>
              </div>
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(user._id)}
                    >
                      +Seguir
                    </button>
                  )}
                  {following.includes(user._id) && (
                    <button
                      className="post__button "
                      onClick={() => unfollow(user._id)}
                    >
                      Dejar de seguir
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className="content__container-btn">
          <button className="previous round" onClick={previousPage}>
            &#8249;
          </button>
          <span className="round page">{page}</span>
          {more && (
            <button className="next round" onClick={nextPage}>
              &#8250;
            </button>
          )}
        </div>
    </>
  );
};
