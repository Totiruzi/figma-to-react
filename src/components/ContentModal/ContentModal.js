import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/YouTube';
// import Carousel from "../Carousel/Carousel";
import axios from 'axios';

import addclass from './ContentModal.module.css'
import { Button } from '@material-ui/core';
import { ViewCarousel } from '@material-ui/icons';
import Carousel from '../Carousel/Courasel';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=658626a5647adb45825342efbbd9f971&language=en-US`)

    setContent(data)
  }

  const fetchVideos = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=658626a5647adb45825342efbbd9f971&language=en-US`)

    setVideo(data.results[0]?.key)
  }

  useEffect(() => {
    fetchData()
    fetchVideos()
  },[])

  return (
    <>
      <div 
        className={addclass.media} 
        type="button"
        color="inherit" 
        onClick={handleOpen}
      >
      {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className={addclass.ContentModal}>
                <img 
                  className={addclass.ContentModal__portrait} 
                  alt={content.name || content.title} 
                  src={
                    content.poster_path
                    ? `${img_500}/${content.poster_path}` 
                    : unavailable
                  }
                />

                <img 
                  className={addclass.ContentModal__landscape} 
                  alt={content.name || content.title} 
                  src={
                    content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}` 
                    : unavailableLandscape
                  }
                />
                <div className={addclass.ContentModal__about}>
                  {/* <span className={addclass.ContentModal__title}>
                    {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        '_____'
                      ).substrng(0, 4)}
                    )
                  </span> */}
                  {content.tagline && (
                    <i className={addclass.tagline}>{content.tagline}</i>
                  )}
                  <span className={addclass.ContentModal__description}>
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant='contained'
                    startIcon={<YouTubeIcon />}
                    color='secondary'
                    target='__blank'
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}




