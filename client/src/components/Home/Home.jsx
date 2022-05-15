import React, { useState, useEffect } from "react";
import S from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../Redux/Actions";
import Card from "../Card/Card.jsx";
import Pagination from "../Paginator/Paginator";
import SideBar from "../SideBar/SideBar";

function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = breeds.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={S.container}>
      <SideBar />
      <div>
        <div className={S.cards}>
          {currentPosts.map((e) => (
            <Card
              key={e.id}
              name={e.name}
              height={e.height}
              weight={e.weight}
              life_span={e.life_span}
              img={e.image}
              id ={e.id}
            />
          ))}
        </div>
        <div className={S.pagi}>
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
