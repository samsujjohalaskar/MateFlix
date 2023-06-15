import React from "react";
import styled from "styled-components";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title, isLarge }) {

  return (
    <Container>
      <div className="media-slider">
      <h2 className="media-slider__title">{title}</h2>
      <div className="media-slider__cards">
        {data.map((movie,index) => (
          <Card isLarge={isLarge} movieData={movie} index={index} key={movie.id} />
        ))}
      </div>
    </div>
    </Container>
  );
});



const Container = styled.div`
  .media-slider {
    color: white;
    padding-top: 30px;
  
    &__title {
      margin-top: 0;
      padding: 0 20px;
    }
  
    &__cards {
      display: flex;
      overflow-x: scroll;
      padding: 10px;
  
      &::-webkit-scrollbar {
        // Hides scrollbar in horizontal slider
        display: none;
      }
    }
  }
  
`;