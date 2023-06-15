import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { getUserLikedMovies } from "../store/store";
import { firebaseAuth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function LikedMovies() {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.MateFlix.movies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email,setEmail] = useState(undefined);
  
  onAuthStateChanged(firebaseAuth,(currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login")
  })

  useEffect(() => {
    if(email){
        dispatch(getUserLikedMovies(email))
    }
  }, [dispatch,email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
        <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
            {
                movies.map((movie,index) => {
                    return <Card movieData = {movie} index = {index} key={movie.id} ifLiked={true}/>
                })
            }
        </div>
        </div>
        <Footer/>
    </Container>
  )
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    height: 75vh;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
