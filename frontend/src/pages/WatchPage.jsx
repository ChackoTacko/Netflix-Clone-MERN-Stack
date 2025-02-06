import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useMediaStore } from '../store/media';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight, Watch } from 'lucide-react';
import ReactPlayer from 'react-player'
import { SMALL_IMG_BASE_URL, ORIGINAL_IMG_BASE_URL } from '../utils/constants.utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { formatReleaseDate } from '../utils/dateFunctions.utis';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';

const WatchPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState({});
    const [similarMedia, setSimilarMedia] = useState();
    const [trailers, setTrailers] = useState();
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { mediaType } = useMediaStore();

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const response = await axios.get(`/api/v1/${mediaType}/${id}/trailers`);
                setTrailers(response.data.content);
            } catch (error) {
                if (error.message.includes('404')) {
                    setTrailers([]);
                }
            }
        }
        getTrailers();
    }, [id, mediaType]);

    useEffect(() => {
        const getSimilarMedia = async () => {
            try {
                const response = await axios.get(`/api/v1/${mediaType}/${id}/similar`);
                setSimilarMedia(response.data.similar);
            } catch (error) {
                if (error.message.includes('404')) {
                    setSimilarMedia([]);
                }
            }
        }
        getSimilarMedia();
    }, [id, mediaType]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/${mediaType}/${id}/details`);
                setContent(response.data.content);
            } catch (error) {
                if (error.message.includes('404')) {
                    setContent(null);
                }
            } finally {
                setIsLoading(false);
            }
        }
        getContentDetails();
    }, [id, mediaType]);


    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
    }

    const handlePrev = () => {
        if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
    }

    if (isLoading) return (
        <div className="min-h-screen bg-black p-10">
            <WatchPageSkeleton />
        </div>
    );

    if (!content) return (
        <div className="h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto">
                <Navbar />
                <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                    <h2 className="text-2l sm:text-5xl font-bold text-balance">Content not found</h2>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-black mn-h-screen text-white">

            <div className='mx-auto container px-4 py-8 h-full bg-black'>
                <Navbar />

                {trailers?.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-wite py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentTrailerIdx === 0} onClick={handlePrev}>
                            <ChevronLeft size={24} />
                        </button>

                        <button className={`bg-gray-500/70 hover:bg-gray-500 text-wite py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={currentTrailerIdx === trailers.length - 1} onClick={handleNext}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}


                <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                    {trailers?.length > 0 && (
                        <ReactPlayer
                            controls
                            width={"100%"}
                            height={"70vh"}
                            className='rounded-lg overflow-hidden ms-auto'
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx]?.key}`}
                        />
                    )}

                    {trailers?.length === 0 && (
                        <h2 className="text-xl text-center mt-5">
                            No trailers available for {" "} <span className="font-bold text-red-600">{content?.title || content?.name}</span>
                        </h2>
                    )}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                    <div className="mb-4 md:mb-0 text-white">
                        <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>

                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}{content?.adult ? <span className='text-red-600'>18+</span> : <span className='text-green-600'>PG-13</span>}
                        </p>
                        <p className='mt-4 text-lg'>{content?.overview}</p>
                    </div>
                    <img src={`${ORIGINAL_IMG_BASE_URL}/${content?.poster_path}`} alt="Poster Image" className='max-h-[600px] rounded-md' />
                </div>

                {similarMedia?.length > 0 && (
                    <div className="mt-12 max-w-5xl mx-auto relative">
                        <h3 className="text-3xl font-bold mb-4">
                            Similar Media
                        </h3>

                        <Swiper
                            modules={[Navigation]}
                            navigation
                            spaceBetween={40}
                            slidesPerView={4}
                            slidesPerGroup={4}
                            breakpoints={{
                                500: { slidesPerView: 4, slidesPerGroup: 4 },
                                640: { slidesPerView: 5, slidesPerGroup: 5 },
                            }}
                            className='trending-now__carousel'
                            style={{
                                "--swiper-navigation-color": "#E50914",
                            }}
                        >
                            {similarMedia.map(media => {
                                if (media.poster_path === null) return null;
                                return (
                                    <SwiperSlide key={media?.id}>
                                        <Link to={`/watch/${media?.id}`}>
                                            <div className="transition-all duration-[500ms] ease-[cubic-bezier(0.33,0,0,1)] hover:scale-105 cursor-pointer">
                                                <img src={`${SMALL_IMG_BASE_URL}${media?.poster_path}`} alt={media?.title} className='w-full h-full object-cover rounded-xl' />
                                                <p className='text-center mt-2'>{media?.title}</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage