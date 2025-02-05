import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { useMediaStore } from '../../store/media';
import useGetTrendingMedia from '../../hooks/useGetTrendingMedia'
import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from '../../utils/constants.utils';
import MediaSlider from '../../components/MediaSlider';

const HomeScreen = () => {
  const { trendingMedia } = useGetTrendingMedia();
  const mediaDate = trendingMedia?.first_air_date ? trendingMedia?.first_air_date.split("-")[0] : trendingMedia?.release_date.split("-")[0];
  const { mediaType } = useMediaStore();
  const [imageLoading, setImageLoading] = useState(true);

  if (!trendingMedia) {
    return (
      <div className='h-screen text-white relative'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
      </div>
    )
  }
  return (
    <>
      <div className='relative h-screen text-white'>
        <Navbar />

        {imageLoading && (
          <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
        )}

        <img src={`${ORIGINAL_IMG_BASE_URL}/${trendingMedia?.backdrop_path}`} alt="Hero Image" className='absolute top-0 left-0 w-full h-full object-cover -z-50' onLoad={() => setImageLoading(false)} />
        {/* Image Gradient */}
        <div className='absolute top-0 left-0 w-full h-full -z-50 bg-black/50' aria-hidden='true' />

        <div className="absolut-top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10"></div>

          <div className='max-w-2xl'>
            <h1 className='mt-4 text-6xl font-extrabold text-balance'>{trendingMedia?.name || trendingMedia?.title}</h1>
            <p className="mt-2 text-lg">{mediaDate} | {trendingMedia?.adult ? "18+" : "PG-13"}</p>

            <p className='mt-4 text-lg'>{trendingMedia?.overview.length > 200 ? trendingMedia?.overview.slice(0, 200) + "..." : trendingMedia?.overview}</p>
          </div>

          <div className="mt-8 flex">
            <Link to={`/watch/${trendingMedia?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
              <Play className='size-6 inline-block mr-2 fill-black' />
              Play
            </Link>

            <Link to={`/watch/${trendingMedia?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white py-4 px-4 rounded flex items-center'>
              <Info className='size-6 inline-block mr-2' />
              More Info
            </Link>

          </div>
        </div>

      </div>

      <div className='flex flex-col gap-10 bg-black py-10'>
        {mediaType === 'movies'
          ? (MOVIE_CATEGORIES.map(category => <MediaSlider key={category} category={category} />))
          :
          (TV_CATEGORIES.map(category => <MediaSlider key={category} category={category} />))}
      </div>
    </>
  )
}

export default HomeScreen