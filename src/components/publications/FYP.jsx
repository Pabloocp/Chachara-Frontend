;
import useAuth from "../../hooks/useAuth";
import { PublicationList } from "./PublicationList";
import { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Getprofile } from "../../helpers/Getprofile";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";

export const FYP = () => {
  const { auth } = useAuth();
  const [publication, setPubli] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
 
  useEffect(() => {
 
    getPublications(1, false);
  }, []);



  const getPublications = async (nextPage = 1 ,showNews = false) => {

    if(showNews){
      setPubli([])
      setPage(1)
      nextPage= 1
    }
    const request = await fetch(
      Global.url + "publication/feed/" + nextPage,
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
      if (!showNews && publication.length >= 1) {
        newPubli = [...publication, ...data.publication];
      }

     
      setPubli(newPubli);

      console.log(data.publication.length);
      if (!showNews && publication.length >= data.totalPub - data.publication.length) {
        setMore(false);
      }
      
    }
  };
  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Timeline</h1>
          <button className="content__button" onClick={() => getPublications(1,true)}>Mostrar nuevas</button>
        </header>
        <PublicationList 
                publication={publication}
                getPublications={getPublications} 
                page= {page}
                setPage = {setPage}
                more = {more}
                setMore=  {setMore}
        
        
        ></PublicationList>            
    

      </section>
    </>
  );
};
