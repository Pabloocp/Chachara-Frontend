import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";
export const People = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("Página actualizada:", page);
    getUsers();
  }, [page]);

  const getUsers = async () => {
    const request = await fetch(Global.url + "user/list/" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    if (data.users && data.status == "success") {
      setUsers(data.users);
      setFollowing(data.user_following);
      console.log(following);
    }
    if (data.totalPages == page) {
      setMore(false);
    } else {
      setMore(true);
    }
  };



  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Descubrir Gente</h1>
        </header>
        <UserList
          users={users}
          setUsers={setUsers}
          following={following}
          setFollowing={setFollowing}
          more = {more}
          page = {page}
          setPage = {setPage}
          setMore={setMore}
        />

       
      </section>
    </>
  );
};
