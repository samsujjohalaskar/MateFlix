import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider({movies}) {

  const getMoviesFromRange = (from,to) => {
    return movies.slice(from,to)
  }

  return (
    <div>
      <CardSlider title="MateFlix Originals" data={getMoviesFromRange(0,20)} isLarge/>
      <CardSlider title="Recently Added" data={getMoviesFromRange(20,40)}/>
      <CardSlider title="Top Picks for You" data={getMoviesFromRange(40,60)}/>
      <CardSlider title="Trending Now " data={getMoviesFromRange(60,80)}/>
      <CardSlider title="Popular on MateFlix" data={getMoviesFromRange(80,100)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(100,120)}/>
    </div>
  )
})
