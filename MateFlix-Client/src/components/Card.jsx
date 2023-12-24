import React, { useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4"
import {onAuthStateChanged} from "firebase/auth"
import {firebaseAuth} from "../utils/firebaseConfig"
import styled from 'styled-components'
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbDownFill,RiThumbUpFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { removeLikedMovies } from '../store/store';


export default React.memo(function Card({movieData,index,key,ifLiked = false,isLarge}) {

    const [isHovered,setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email,setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth,(currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login")
    })

    const addToList = async() => {
      try{
        await axios.post("http://localhost:5000/api/user/add",{email,data: movieData})
      }catch (err){
        console.log(err);
      }
    }
    // console.log(movieData.name)

  return (
    <Container 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div key={movieData.id} className="media-card">
      <img
      className={classNames(
          'media-card__poster',
          { 'media-card__poster--large': isLarge },
      )}
      src={
          isLarge
          ? `https://image.tmdb.org/t/p/w500${movieData.image}`
          : `https://image.tmdb.org/t/p/w300${movieData.image}`
      }
      alt={movieData.name}/>
      {
        isHovered && (
            <div className="hover">
                <div className="image-video-container">
                    {/* <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
                    alt="card" 
                    onClick={() => navigate("/player")}
                    /> */}
                    <video src={video} autoPlay loop controls muted onClick={() => navigate("/player")}/>
                </div>
                <div className="info-container flex column">
                    <h3 className='name' onClick={() => navigate("/player")}>{movieData.name}</h3>
                    <div className="icons flex j-between">
                        <div className="controls flex">
                            <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")}/>
                            <RiThumbUpFill title="Like"/>
                            <RiThumbDownFill title="Dislike" />
                            {
                                ifLiked ?
                                    (<BsCheck title="Remove from List" onClick={() =>
                                        dispatch(
                                          removeLikedMovies({ movieId: movieData.id, email })
                                        )
                                      }
                                    />) :
                                    (<AiOutlinePlus title="Add to My List" onClick={addToList}/>)
                            }
                        </div>
                        <div className="info">
                            <BiChevronDown title="More Info"/>
                        </div>
                    </div>
                    <div className="genres flex">
                        <ul className='flex'>{movieData.genres.map((genre) => (
                            <ul key={genre}>&nbsp;{genre}&nbsp;|</ul>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>            
            )
        } 
        </div>
    </Container>
  )
});

const Container = styled.div`
  .media-card {
    position: relative;
    cursor: pointer;
    transition: 360ms;
    img {
        border-radius: 0.2rem;
        z-index: 10;
      }
    
    &:hover {
      transform: scale(1.1);
      
      .media-card {
        &__cover {
          opacity: 1;
        }
      }
    }
    
    &__poster {
      flex: 0 0 auto;
      object-fit: cover;
      height: 120px;
      width: 200px;
      transition: transform 360ms;
      margin-right: 10px;
      
      &--large {
        height: 250px;
      }
    }
    .hover {
      z-index: 99;
      height: max-content;
      width: 20rem;
      position: absolute;
      top: -18vh;
      left: -6vh;
      border-radius: 0.3rem;
      box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
      background-color: #181818;
      transition: 0.3s ease-in-out;
      .image-video-container {
        position: relative;
        height: 140px;
        // img {
        //   width: 100%;
        //   height: 140px;
        //   object-fit: cover;
        //   border-radius: 0.3rem;
        //   top: 0;
        //   z-index: 4;
        //   position: absolute;
        // }
        video {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 0.3rem;
          top: 0;
          z-index: 5;
          position: absolute;
        }
      }
      .info-container {
        padding: 1rem;
        gap: 0.5rem;
      }
      .icons {
        .controls {
          display: flex;
          gap: 1rem;
        }
        svg {
          font-size: 2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }
        }
      }
    }
`;