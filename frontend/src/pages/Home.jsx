import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const nav = useNavigate()
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleMouseEnterGender = () => {
    setIsGenderOpen(true);
  };

  const handleMouseLeaveGender = () => {
    setIsGenderOpen(false);
  };

  const handleMouseEnterCategory = () => {
    setIsCategoryOpen(true);
  };

  const handleMouseLeaveCategory = () => {
    setIsCategoryOpen(false);
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/random_recommendations');
      const data = response.data;

      // Fetch the image link from images.csv using id as filename
      const csvResponse = await fetch('/images.csv');
      const csvText = await csvResponse.text();
      const parsedData = Papa.parse(csvText, { header: true });

      const updatedRecommendations = data.map((recommendation) => {
        const idStr = recommendation.id.toString();
        const image = parsedData.data.find((item) => item.filename === `${idStr}.jpg`);
        if (image) {
          return { ...recommendation, link: image.link };
        }
        return recommendation;
      });

      setRecommendations(updatedRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  console.log(recommendations);

  return (
    <>
      <Navbar />

      <div className="flex bg-black text-white min-h-screen w-screen">
        <div className="bg-black p-4 w-56 mt-7">
          <ul className="space-y-4">
            <li
              className="relative"
              onMouseEnter={handleMouseEnterGender}
              onMouseLeave={handleMouseLeaveGender}
            >
              <button className=" text-white font-bold w-full text-left">
                Gender
              </button>
              <ul
                className={`z-10 absolute top-full left-0 bg-black w-48 py-2 ${isGenderOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  } transition-all duration-300 ease-in-out`}
              >
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Men</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Women</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Other</button>
                </li>
              </ul>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnterCategory}
              onMouseLeave={handleMouseLeaveCategory}
            >
              <button className="text-white font-bold w-full text-left">
                Category
              </button>
              <ul
                className={`absolute top-full left-0 bg-black w-48 py-2 ${isCategoryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  } transition-all duration-300 ease-in-out`}
              >
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Apparel</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Accessories</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Footwear</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Personal Care</button>
                </li>
                <li>
                  <button className="text-white w-full text-left px-4 py-2">Accessories</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex-grow bg-black text-white py-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-8">
              {recommendations.map((product) => (
                <div key={product.id} className="cursor-pointer bg-white rounded-lg p-4" onClick={() => nav(`/${product.id}`)}>
                  <img src={product.link} alt={product.name} className="w-auto h-auto object-cover mb-4 rounded-lg" />
                  <h2 className="text-lg font-bold text-black">{product.name}</h2>
                  <div className='flex justify-between'>
                  <button className="w-[45%] flex justify-center items-center bg-white text-black border border-black text-sm ">
                    <FaHeart className="icon mr-2 text-lg" />
                    Save in Watchlist
                  </button>

                  <button className=" w-[45%] justify-center flex items-center bg-black text-white border border-white text-sm">
                    <FaShoppingCart className="icon mr-2 text-white text-lg" />
                    Add to Cart
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
