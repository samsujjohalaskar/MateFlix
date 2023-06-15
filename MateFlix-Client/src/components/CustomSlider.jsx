import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function CustomSlider({movies}) {

  const getMoviesFromRange = (from,to) => {
    return movies.slice(from,to)
  }

  return (
    <div>
      <CardSlider title="MateFlix Originals" data={getMoviesFromRange(0,15)}/>
      <CardSlider title="Recently Added" data={getMoviesFromRange(20,30)}/>
      <CardSlider title="Top Picks for You" data={getMoviesFromRange(30,44)}/>
      <CardSlider title="Trending Now " data={getMoviesFromRange(44,60)}/>
      <CardSlider title="Popular on MateFlix" data={getMoviesFromRange(60,70)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(75,90)}/>
    </div>
  )
})
