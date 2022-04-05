/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Header } from "../components";
import { GET_PHOTOS } from "../queries";

export const Home = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [liked, setLiked] = useState([]);
  const [date, setDate] = useState("");

  const fetchPhotos = async () => {
    setIsFetching(true);
    try {
      const res = await GET_PHOTOS(searchValue, date);
      setData(res?.data?.photos);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  const handleLike = (id) => {
    setLiked((prevLikes) => [...prevLikes, id]);
  };

  useEffect(() => {
    fetchPhotos();
  }, [searchValue, date]);

  useEffect(() => {
    localStorage.setItem("likedPhotos", JSON.stringify(liked));
  }, [liked]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchValue(value);
    }
  };

  const isLiked = JSON.parse(localStorage.getItem("likedPhotos"));

  console.log(isLiked);

  return (
    <div>
      <Header />
      {isFetching ? (
        <div className="Loader">
          <img
            src="https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-24.gif"
            alt="loader"
          />
        </div>
      ) : (
        <>
          <div className="main">
            <div className="search-area">
              <div className="filter">
                <label htmlFor="filter">Filter by date</label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  id="filter"
                  type="date"
                />
              </div>
              <div className="search">
                <label htmlFor="search">Search by Camera Name</label>
                <input
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  id="search"
                  type="text"
                />
              </div>
            </div>
            {data?.length > 0 ? (
              <div className="card-area">
                {data?.map((d, i) => (
                  <div key={i} className="card">
                    <div className="flex-header">
                      <h6>Camera:{d?.camera?.name}</h6>
                      <h6>Earth Date:{moment(d?.earth_date).format("LLL")}</h6>
                    </div>
                    <img src={d?.img_src} alt="" />
                    <div className="footer">
                      {isLiked.includes(d?.id) ? (
                        <button className="liked">Liked</button>
                      ) : (
                        <button
                          onClick={() => handleLike(d.id)}
                          className="like-btn"
                        >
                          Like
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="empty-state">
                  <h4>No Data to display</h4>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
