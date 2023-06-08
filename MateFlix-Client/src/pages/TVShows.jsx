import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { fetchMovies, getGenres } from "../store/store";
import { firebaseAuth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import Slider from "../components/Slider";
import SelectingGenres from "../components/SelectingGenres";

export default function TVShows() {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.MateFlix.movies);
  const genres = useSelector((state) => state.MateFlix.genres);
  const genresLoaded = useSelector((state) => state.MateFlix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres({}));
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [dispatch,genres,genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
        <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
        <SelectingGenres genres={genres} type="tv"/>
            {
                movies.length ? (<Slider movies={movies}/>):
                (<NotAvailable/>)
            }
        </div>
    </Container>
  )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
