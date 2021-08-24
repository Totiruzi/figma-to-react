import { Badge } from '@material-ui/core'
import { img_300, unavailable } from '../../config/config'
import ContentModal from '../ContentModal/ContentModal'
import classes from './SingleContent.module.css'

const SingleContent = ({id, poster, title, date, media, vote, votec}) => {
  return (
    <ContentModal media_type={media} id={id}>
      <Badge badgeContent={vote} color={vote > 6 ? 'primary' : 'secondary'}/>
      <img className={classes.poster} src={poster ?`${img_300}/${poster}` : unavailable} alt={title}/>
      <b className={classes.title}>{title}</b>
      <span className={classes.subTitle}>{media === 'tv' ? 'Tv Series' : 'Movie'}
      <span className={classes.subTitle}>{date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent
