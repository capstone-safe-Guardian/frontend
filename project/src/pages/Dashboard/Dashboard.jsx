import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './Searchbar';
import VideoList from './VedioList';
import './Dashboard.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Dashboard() {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        'self help', 
        'reducing stress', 
        'anxiety', 
        'panic attacks', 
        'breathing exercises', 
        'stretching', 
        'calm music', 
        'meditation'
    ];

    const fetchVideos = async (query) => {
        try {
            const response = await fetch(`http://localhost:8888/api/videos?query=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setVideos(data);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch videos:", err);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchVideos(query);
    };

    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category) {
            fetchVideos(category);
        } else {
            setVideos([]);
        }
    };

    return (
        <div className="app-container">
            <ToastContainer />
            <Header />
            <h1>Video Recommendations</h1>
            <SearchBar onSearch={handleSearch} />
            <div className="categories-container">
                {categories.map(category => (
                    <label key={category} className="category-label">
                        <input
                            type="radio"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={handleCategoryChange}
                            className="category-input"
                        />
                        <span className="category-text">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                    </label>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <VideoList videos={videos} />
            <Footer />
        </div>
    );
}

export default Dashboard;
