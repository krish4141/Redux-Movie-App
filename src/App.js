
import './App.scss';
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect} from 'react';

import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import { getApiConfiguration, getGenres } from './store/homeSlice';





function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  // const [data, setData] = useState({data: []});
  // const [err, setErr] = useState('');
  
// const fetch  = {
//   method: 'GET',
//   url: 'https://covid-19-statistics.p.rapidapi.com/regions',
//   headers: {
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
//   }
// };
//   const fetchData = async() => {
//     try {
//       const response = await axios.request(fetch);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

     const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
      });
     };


     const genresCall = async () => {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
          promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      const data = await Promise.all(promises);
      console.log(data);
      data.map(({ genres }) => {
          return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(getGenres(allGenres));
  };


  return (
    // <div className="App">
    //   App

    //   {/* <button onClick={fetchData}>FetchingData</button> */}
    // </div>

    <BrowserRouter>
      <Header />
       <Routes>
           <Route path="/"  element={<Home/>}/>
           <Route path="/:mediaType/:id" element={<Details />}/>
           <Route path="/search/:query" element={<SearchResult />}/>
           <Route path="/explore/:mediaType" element={<Explore />} />
           <Route path="*" element={<PageNotFound />} />
       </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
