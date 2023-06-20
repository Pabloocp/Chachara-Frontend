import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../users/UserList";
import { useParams } from "react-router-dom";
import { Getprofile } from "../../helpers/Getprofile";
export const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    getUsers();
    Getprofile(params.userId,setUserProfile)
  }, []);

  useEffect(() => {
    console.log("Página actualizada:", page);
    getUsers();
  }, [page]);

  const getUsers = async () => {
    const userId = params.userId;
    const request = await fetch(
      Global.url + "follow/followers/" + userId + "/" + page,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();
    
    let cleanUsers = [];
    data.finded.forEach((follow) => {
        cleanUsers = [...cleanUsers, follow.user];
    });
    
    
    let newUser = cleanUsers;
    
    console.log(newUser);
    if (newUser && data.status == "success") {
        console.log(newUser);
        setUsers(newUser);
        setFollowing(data.user_following);
      }
      if (data.pages == page) {
        setMore(false);
      } else {
        setMore(true);
      }
  };

  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Seguidores de {userProfile.name}({"@"+userProfile.nick})</h1>
        </header>
        <UserList
          users={users}
          setUsers={setUsers}
          following={following}
          setFollowing={setFollowing}
          more={more}
          page={page}
          setPage={setPage}
        />
      </section>
    </>
  );
};
