import React, { useState, useEffect } from "react";
import S from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, searchBreed } from "../../Redux/Actions";
import Card from "../Card/Card.jsx";
import Pagination from "../Paginator/Paginator";
import SideBar from "../SideBar/SideBar";
import img from "../../img/dificulties.png";

function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.filteredBreeds);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getBreeds());
    setCurrentPage(1);
  }, [dispatch, breeds]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = breeds.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const back = () => dispatch(searchBreed(""));

  if (!breeds.length) {
    return <img height="100%" src={img} alt="problem has ocurred" />;
  }

  return (
    <div className={S.container}>
      <div className={S.left}>
        <SideBar />
      </div>
      <div className={S.right}>
        <div className={S.cards}>
          {currentPosts.map((e) => {
            if (e.name) {
              return (
                <Card
                  key={e.id}
                  name={e.name}
                  height={e.height}
                  weight={e.weight}
                  life_span={e.life_span}
                  img={e.image}
                  id={e.id}
                />
              );
            }
          })}
        </div>
        <div className={S.pagi}>
          {breeds.length < 170 && (
            <button className={S.back} onClick={back}>
              back
            </button>
          )}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={breeds.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
