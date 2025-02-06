import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useMediaStore } from '../store/media';
import useeGetCategoryMedia from '../hooks/useGetCategoryMedia';
import { SMALL_IMG_BASE_URL } from '../utils/constants.utils';

const MediaSlider = ({ category }) => {
  const { mediaType } = useMediaStore();
  const { categoryMedia } = useeGetCategoryMedia(category);

  const splitCategory = category.split("_");
  for (let i = 0; i < splitCategory.length; i++) {
    splitCategory[i] = splitCategory[i][0].toUpperCase() + splitCategory[i].slice(1);
  }
  const formattedMediaName = splitCategory.join(" ");
  const formattedMediaType = mediaType === 'movies' ? 'Movies' : 'TV Shows';
  return (
    <div className='text-white bg-black relative px-5 md:px-20'>
      <h2 className='font-bold text-2xl mb-4'>{formattedMediaName} {formattedMediaType}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={40}
        slidesPerView={3}
        slidesPerGroup={3}
        breakpoints={{
          500: { slidesPerView: 4, slidesPerGroup: 4 },
          640: { slidesPerView: 5, slidesPerGroup: 5 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1440: { slidesPerView: 8, slidesPerGroup: 8 },
          2000: { slidesPerView: 10, slidesPerGroup: 10 },
        }}
        className='trending-now__carousel'
        style={{
          "--swiper-navigation-color": "#E50914",
        }}
      >
        {categoryMedia?.map((media) => (
          <SwiperSlide key={`${category}-${media.title || media.name}`}>
            <Link to={`/watch/${media.id}`}>
              <div className="transition-all duration-[500ms] ease-[cubic-bezier(0.33,0,0,1)] hover:scale-105 cursor-pointer">
                <img src={`${SMALL_IMG_BASE_URL}${media.poster_path}`} alt={media.title} className='w-full h-full object-cover rounded-xl'/>
                <p className='text-center mt-2'>{media.title}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MediaSlider