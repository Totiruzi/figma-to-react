import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import classes from './Movies.module.css'

const Movies = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numbersOfPages, setNumbersOfPages] = useState()

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=658626a5647adb45825342efbbd9f971&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`)

    console.log(data)
    setContent(data.results)
    setNumbersOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, [page])
  return (
    
    <div>
      <span className={classes.pageTitle}>Movies</span>
      <div className={classes.trending}>
        {content && content.map((c) => (
          <SingleContent 
            key={c.id} 
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media={c.media_type}
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

export default Movies
