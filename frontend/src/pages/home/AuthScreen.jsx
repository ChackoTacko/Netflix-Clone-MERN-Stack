// Desc: Authenticated home page for the Netflix Clone

// Package Imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

// Custom Components
import Panels from '../../components/Panels';
import Footer from '../../components/Footer';

// Custom State Hooks
import useGetAuthMedia from '../../hooks/useGetAuthMedia';

// Custom Utils
import { SMALL_IMG_BASE_URL, FAQS } from '../../utils/constants.utils';

// Custom Images
import PopcornIcon from '../../images/PopcornIcon';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import custom styles
import './AuthScreen.css';
import CustomSection from '../../components/CustomSection';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const { authMedia } = useGetAuthMedia();
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        navigate(`/signup?email=${email}`);
    }

    return (
        <div className="hero-bg relative">
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
                <img src="/netflix-logo.png" alt="Netflix Logo" className='w-32 md:w-52' />
                <Link to={'login'} className='text-white bg-netflix-red hover:bg-netflix-red-hover  py-1 px-2 rounded'>
                    Sign In
                </Link>
            </header>

            <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
                <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
                <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>

                <form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleSignup}>
                    <input
                        type="email"
                        className="p-2 rounded flex-1 bg-black/80 border-gray-700"
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <button className="bg-netflix-red hover:bg-netflix-red-hover text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
                        Get Started <ChevronRight className='size-8 md:size-10' />
                    </button>
                </form>
            </div>

            <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

            <div className="bg-black pb-24">
                <div className="w-full px-8 text-white max-w-[1212px] mx-auto pt-8">
                    <div className='signup-banner mb-16 flex flex-column justify-between items-center transition-all duration-[500ms] ease-[cubic-bezier(0.33,0,0,1)] hover:scale-105'>
                        <PopcornIcon className="mr-4 hidden sm:inline" />
                        <div className='w-full flex flex-col md:flex-row justify-between md:items-center bg-custom-gradient-image px-6 py-3 rounded-2xl self-end'>
                            <div className='flex flex-col gap-1 mb-3 md:m-0'>
                                <span className='font-bold text-xl'>The Netflix you love for just $7.99</span>
                                <span className='text-base'>Get our most affordabe, ad-supported plan.</span>
                            </div>
                            <Link to={'/signup'}><button className='bg-[#42445A] py-[6px] px-4 rounded-[4px] text-base font-bold'>Sign Up</button></Link>
                        </div>
                    </div>
                    <CustomSection title='Trending Now'>
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            spaceBetween={40}
                            slidesPerView={2}
                            breakpoints={{
                                320: { slidesPerView: 3 },
                                640: { slidesPerView: 6 },
                                1024: { slidesPerView: 5 },
                            }}
                            className='trending-now__carousel'
                            style={{
                                "--swiper-navigation-color": "#E50914",
                            }}
                        >
                            {authMedia.map((movie, i) => (
                                <SwiperSlide key={movie.id} className='trending-now__slide'>
                                    <Link to={`/watch/${movie.id}`}>
                                        <div className="transition-all duration-[500ms] ease-[cubic-bezier(0.33,0,0,1)] hover:scale-105 cursor-pointer">
                                            <img src={`${SMALL_IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='w-full h-full object-cover rounded-xl' />
                                            <div className="absolute bottom-20 -left-2 text-[64px] leading-none inline-block cursor-pointer h-[1rem] font-bold text-[#414141] [-webkit-text-stroke:0.25rem_white] [text-shadow:0_0_1.5rem_rgba(0,0,0,0.5)]">
                                                {i + 1}
                                            </div>
                                            <div className="absolute bottom-20 -left-2 text-[64px] leading-none inline-block cursor-pointer h-[1rem] font-bold text-black [-webkit-text-fill-color: black] [-webkit-text-stroke: 0;]">
                                                {i + 1}
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </CustomSection>
                    <CustomSection title='More Reasons To Join'>
                        <Panels />
                    </CustomSection>
                    <CustomSection title='Frequently Asked Questions'>
                        {FAQS.map((faq, i) => (
                            <Accordion key={faq.question} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)} sx={{ backgroundColor: "#2D2D2D", marginBottom: '8px' }}>
                                <AccordionSummary
                                    expandIcon={expanded === `panel${i + 1}` ? <CloseIcon style={{ color: 'white' }} /> : <AddIcon style={{ color: 'white' }} />}
                                    aria-controls={`panel${i + 1}-content`}
                                    id={`panel${i + 1}-header`}
                                >
                                    <Typography component="span" className='font-normal text-lg' sx={{ fontSize: '18px', color: 'white' }}>{faq.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component="div" className='flex flex-col gap-4' sx={{ fontSize: '18px', color: 'white' }}>{faq.answer.map((sentence, i) => {
                                        return <span key={i}>{sentence}</span>
                                    })}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </CustomSection>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AuthScreen;