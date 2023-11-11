/* @jsxImportSource react */
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const GifSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = '9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7';
  const handleFavorite = async (gif: Gif) => {
    try {
      // Implement logic to store the favorite GIF in Firebase
      // You can use the Firebase Realtime Database or Firestore for this
      // For example, if using Firestore:
      // const user = getCurrentUser(); // Implement getCurrentUser() based on your authentication logic
      // await addFavoriteToFirestore(user.uid, gif);
  
      console.log('GIF favorited:', gif);
    } catch (error) {
      console.error('Error favoriting GIF:', error);
    }
  };
  

  useEffect(() => {
    
    
    const fetchGifs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=10`
        );
        setGifs(response.data.data);
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch GIFs when the query changes
    if (query.trim() !== '') {
      fetchGifs();
    } else {
      // Clear the GIFs when the query is empty
      setGifs([]);
    }
  }, [query, apiKey]);

  return (
    <>
      <Navbar onSearch={setQuery} loading={loading} />

      <div className="relative h-screen">
        <div className="flex flex-col items-center h-full p-4 bg-white">
          {loading && (
            <img
            src="/images/loader.gif" // Replace with the path to your loading GIF
            alt="Loading"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          )}
          <div className="flex flex-wrap mt-4 ">
            {gifs.map((gif) => (
              <div key={gif.id} className="m-2 rounded shadow-lg">
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  style={{ maxWidth: '350px', maxHeight: '350px' }}
                />
                <button onClick={() => handleFavorite(gif)} className='p-2'>❤️</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GifSearch;
