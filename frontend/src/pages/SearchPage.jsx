// Desc: Search page for the Netflix Clone
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Custom Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Custom State Store
import { useMediaStore } from '../store/media';

// Custom Utils
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants.utils';

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('movie');
    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const { setMediaType } = useMediaStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === 'movie' ? setMediaType('movies') : setMediaType('tv');
        setSearchResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/v1/search/${activeTab}/${searchQuery}`);
            setSearchResults(response.data.content);
        } catch (error) {
            if (error.response.status == 404) {
                toast.error("No results found");
                setSearchResults([]);
            } else {
                toast.error("An error occurred, please try again later");
            }
        }
    };

    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            <div className="container mx-auto px-4-py-8">
                <div className="flex justify-center gap-3 mb-4">
                    <button className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick('movie')}>Movies</button>
                    <button className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick('tv')}>TV Shows</button>
                    <button className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => handleTabClick('person')}>Actors</button>
                </div>

                <form action="" className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${activeTab === 'movie' ? 'Movies' : activeTab === 'tv' ? 'TV shows' : 'Actors'}...`}
                        className="w-full p-2 rounded bg-gray-800 text-white" />
                    <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                        <Search className='size-6' />
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4" >
                    {searchResults.map((result) => {
                        if (!result.poster_path && !result.profile_path) {
                            return null;
                        }
                        return (
                            <div key={result.id} className="bg-gray-800 rounded p-4">
                                {activeTab === 'person' ? (
                                    <div className="flex flex-col items-center">
                                        <img src={`${ORIGINAL_IMG_BASE_URL}${result.profile_path}`} alt={result.name} className="max-h-96 rounded mx-auto" />
                                        <h2 className="mt-2 text-xl font-bold"></h2>
                                    </div>
                                ) : (
                                    <Link to={`/watch/${result.id}`} className="flex flex-col items-center" onClick={() => setMediaType(activeTab === 'movie' ? 'movies' : 'tv')}>
                                        <img src={`${ORIGINAL_IMG_BASE_URL}${result.poster_path}`} alt={result.title} className="max-h-96 rounded mx-auto" />
                                        <h2 className="mt-2 text-xl font-bold"></h2>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchPage