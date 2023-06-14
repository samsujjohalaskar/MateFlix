import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider({movies}) {

  const getMoviesFromRange = (from,to) => {
    return movies.slice(from,to)
  }

  return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
      <CardSlider title="Recently Added" data={getMoviesFromRange(10,20)}/>
      <CardSlider title="Top Picks for You" data={getMoviesFromRange(20,30)}/>
      <CardSlider title="MateFlix Originals" data={getMoviesFromRange(40,50)}/>
      <CardSlider title="Popular on MateFlix" data={getMoviesFromRange(30,40)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(50,60)}/>
    </div>
  )
})
