import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';

import addclass from './carousel.module.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState()

  const items = credits?.map((c) => (
    <div className={addclass.carouselItem}>
      <img 
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className={addclass.carouselItem__img}
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ))

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=658626a5647adb45825342efbbd9f971&language=en-US`
    )
    setCredits(data.cast)
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  return (
    <AliceCarousel 
      autoPlay 
      mouseTracking 
      items={items} 
      responsive={responsive}
      infinite
      disableButtonsControls
      disableDotsControls
    />
  );
}

export default Carousel 