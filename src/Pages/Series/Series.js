import axios from 'axios'
import { useEffect, useState } from 'react'
import Genres from '../../components/Genres'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenre from '../../hooks/useGenre'
import classes from './Series.module.css'

const Series = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numbersOfPages, setNumbersOfPages] = useState()
  const [selectedGenres, setSelectedGeneres] = useState([])
  const [genres, setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres)

  const fetchSeries = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=658626a5647adb45825342efbbd9f971&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres=${genreforURL}`)
    
    // https://api.themoviedb.org/3/discover/tv?api_key=<<YOUR_API_KEY>>&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate

    // https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}/episode/{episode_number}?api_key=<<YOUR_API_KEY>>&language=en-US&page=${page}&with_genres=${genreforURL}
    console.log(data)
    setContent(data.results)
    setNumbersOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchSeries()
    // return () => {
    //   cleanup
    // }
  }, [page, genreforURL])
  return (
    <div>
      <span className={classes.pageTitle}>Tv Serials rolling</span>
      <Genres 
        type='tv' 
        setGenres={setGenres} 
        setSelectedGeneres={setSelectedGeneres} 
        genres={genres} 
        selectedGenres= {selectedGenres}
        setPage={setPage}
      />
      <div className={classes.trending}>
        {content && content.map((c) => (
          <SingleContent 
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media="tv"
            vote={c.vote_average} 
            votec={c['vote_count']} 
          />)
        )}
      </div>
      {numbersOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numbersOfPages}/>
      )}
    </div>
  )
}

export default Series
