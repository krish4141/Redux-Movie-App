import React, { useState } from 'react'

import "../style.scss";
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';



const Popular = () => {

    const[endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular`);

   const onTabChange = (tab) => {
    setEndpoint( tab === "Movies" ? "movie" : "tv");
   };

    
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className='carouselTitle'>Most-Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular;