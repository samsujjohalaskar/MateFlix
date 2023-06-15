import React, { useState, useEffect } from 'react';
import tmdb, { ImageSizes, generateImageUrl } from '../utils/constants';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const navigate = useNavigate();

    const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchBannerMovie = async () => {
      const json = await tmdb.get("/trending/all/day", { with_networks: 213 });
      setMovie(
        json.results[
          Math.floor(Math.random() * json.results.length - 1)
        ]
      );
    };
    fetchBannerMovie();
    
  }, []);

  return (
    <Container>
    <div
      className="banner"
      style={{
        backgroundImage: `url(${generateImageUrl(movie?.backdrop_path || '', ImageSizes.backdrop)})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h1 className="banner__description">
          {movie?.overview}
        </h1>
        <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
      </div>
      {/* <div className="banner__cover" /> */}
    </div>
    </Container>
  );
}

export default Banner;

const Container = styled.div`
.banner {
    position: relative;
    object-fit: contain;
    font-family: serif;
    height: 100vh;
    background-size: cover;
    background-position: center center;
    margin-bottom: 40px;
  
    &__contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      overflow: hidden;
      padding-top: 400px;
      padding-left: 5rem;
    }
  
    &__title {
        font-size: 4rem;
        font-weight: 800;
        padding-bottom: 0.3rem;
        margin: 0px 0px;
    }
  
    &__description {
        width: 45rem;
        line-height: 1.2rem;
        padding-top: 0rem;
        font-size: 1rem;
        max-width: 550px;
        height: 100px;
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-left: 10px;
    }
  
    &__cover {
      bottom: 0;
      width: 100%;
      position: absolute;
      height: 150px;
      background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37, 37, 37, 0.61),
        #111
      );
    }
  }
  .buttons {
        margin-top: 25px;
        margin: 10px;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
    
`;
