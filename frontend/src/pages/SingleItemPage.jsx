import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';

const SingleItemPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [focusedItemDetails, setFocusedItemDetails] = useState(null);
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/random_recommendations');
            const data = await response.json();

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

    const fetchFocusedItemDetails = async (itemId) => {
        try {
            const csvResponse = await fetch('/styles.csv');
            const csvText = await csvResponse.text();
            const parsedData = Papa.parse(csvText, { header: true });

            const focusedItem = parsedData.data.find((item) => item.id === itemId.toString());
            console.log(focusedItem);

            if (focusedItem) {
                setFocusedItemDetails({
                    id: focusedItem.id,
                    gender: focusedItem.gender,
                    masterCategory: focusedItem.masterCategory,
                    subCategory: focusedItem.subCategory,
                    articleType: focusedItem.articleType,
                    baseColour: focusedItem.baseColour,
                    season: focusedItem.season,
                    year: focusedItem.year,
                    usage: focusedItem.usage,
                    productDisplayName: focusedItem.productDisplayName,
                });
            }
        } catch (error) {
            console.error('Error fetching focused item details:', error);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    useEffect(() => {
        if (recommendations.length > 0) {
            fetchFocusedItemDetails(recommendations[0].id);
        }
    }, [recommendations]);

    return (
        <>
            <Navbar />

            <div className="flex bg-black text-white min-h-screen w-screen">
                <div className="flex-grow bg-black text-white py-10">
                    <div className="container mx-auto">
                        <div className="gap-8">
                            {recommendations.length > 0 && (
                                <div className="flex">
                                    <div className="bg-white rounded-lg p-4 w-[60%]">

                                        <div className="flex items-center justify-center relative">
                                            <div className="absolute top-0 left-0 bg-black px-4 py-2 rounded-lg text-white text-lg font-bold w-[40%] z-30">
                                                {recommendations[0].name}
                                            </div>
                                            <img
                                                src={recommendations[0].link}
                                                alt={recommendations[0].name}
                                                className="w-auto h-[36rem] object-cover mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                    </div>
                                    <div className='p-4 w-[40%]'>
                                        <h2 className="text-center text-white text-2xl font-bold mb-2">{focusedItemDetails?.productDisplayName}</h2>
                                        <p className='text-lg font-semibold text-center'>{focusedItemDetails?.articleType}</p>

                                        <div className='flex items-center ml-4'>
                                            <div className="flex items-center mt-4 border-white border-2 rounded-lg w-16 ml-8">
                                                <span className="ml-2">4.0</span>
                                                <FaStar className="h-5 w-5 ml-1 text-white" />
                                            </div><span className="ml-2 mt-4">Based on 30 ratings</span>
                                        </div>
                                        <div className='flex border-b border-white'>
                                            <span className="ml-12 mt-3 text-white text-2xl font-bold mb-2">&#8377; 839</span>
                                            <span className="ml-2 mt-5 text-white text-md font-normal mb-2">MRP <span className="line-through">1429</span></span>
                                        </div>
                                        <div className='flex mt-5 gap-8'>
                                            <button className="w-[45%] flex justify-center items-center bg-white text-black">
                                                <FaHeart className="icon mr-2" />
                                                Save in Watchlist
                                            </button>

                                            <button className=" w-[45%] justify-center flex items-center bg-black text-white border border-white">
                                                <FaShoppingCart className="icon mr-2" />
                                                Add to Cart
                                            </button>
                                        </div>
                                        {focusedItemDetails && (
                                            <div className=" mt-8 text-white">

                                                <p><span className="font-semibold">Gender:</span> {focusedItemDetails.gender}</p>
                                                <p><span className="font-semibold">Master Category:</span> {focusedItemDetails.masterCategory}</p>
                                                <p><span className="font-semibold">Sub Category:</span> {focusedItemDetails.subCategory}</p>

                                                <p><span className="font-semibold">Base Colour:</span> {focusedItemDetails.baseColour}</p>
                                                <p><span className="font-semibold">Season:</span> {focusedItemDetails.season}</p>
                                                <p><span className="font-semibold">Year:</span> {focusedItemDetails.year}</p>
                                                <p><span className="font-semibold">Usage:</span> {focusedItemDetails.usage}</p>
                                                <p><span className="font-semibold">Product Display Name:</span> {focusedItemDetails.productDisplayName}</p>
                                                <p><span className="font-semibold">ID:</span> {focusedItemDetails.id}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="col-span-1">
                                <div className="overflow-x-auto whitespace-nowrap">
                                    {recommendations.slice(1, 6).map((product) => (
                                        <div key={product.id} className="inline-block m-2">
                                            <img
                                                src={product.link}
                                                alt={product.name}
                                                className="w-24 h-24 object-cover mb-2 rounded-lg cursor-pointer"
                                            />
                                            <p className="text-sm font-semibold text-white">{product.name}</p>
                                            <p className="text-sm text-gray-400">${product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleItemPage;
