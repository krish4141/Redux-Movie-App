import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjhjZDA2YWI1ZjY2OTA3MGUzYzg0M2U1YjljZjFmMiIsInN1YiI6IjY0NmQ5NDY5MmJjZjY3MDE3MmIzNzY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ILdjQxG-vQq4sI7xOq0GcphX6TCelv_LAevTkQFLt4Y";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,

};

export const fetchDataFromApi = async(url, params) => {
    try{
        const {data} = await axios.get( BASE_URL + url, {
            headers,
            params
        })
        return data;

    }catch (err) {
       console.log(err);
       return err;
    }
}