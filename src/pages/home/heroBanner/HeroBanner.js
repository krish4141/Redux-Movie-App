import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import "./style.scss";


const HeroBanner = () => {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate("");

  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
       
         event.preventDefault();
         if(query.length > 0) {
          const searchUrl = `/search/${query}`;
          navigate(searchUrl);
         
      }
  }
  return (
    <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <form onSubmit={searchQueryHandler}>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            
                        />
                        <button>Search</button>
                    </div>
                    </form>
                </div>
            </ContentWrapper>
        </div>
    );
};
  

export default HeroBanner
