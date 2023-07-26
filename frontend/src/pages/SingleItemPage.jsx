import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Navbar from '../components/Navbar';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SingleItemPage = () => {
    const nav=useNavigate()
    const {item}=useParams()
    console.log(item);
    const [recommendations, setRecommendations] = useState([]);
    const [focusedItemDetails, setFocusedItemDetails] = useState(null);
    const fetchRecommendations = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/unique_recommendations', {
              product_name: focusedItemDetails?.name,
            });
          const data = response.data;
    
          setRecommendations(data);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      };

      const fetchFocusedItemDetails = async (itemId) => {
        try {
          const csvResponse = await axios.get('/styles.csv');
          const csvText = csvResponse.data;
          const parsedData = Papa.parse(csvText, { header: true });

          const csvResponse2 = await axios.get('/images.csv');
          const csvText2 = csvResponse2.data;
          const parsedData2 = Papa.parse(csvText2, { header: true });
          const idStr = itemId.toString();
          const image = parsedData2.data.find((item) => item.filename === `${idStr}.jpg`);
    
          const focusedItem = parsedData.data.find((item) => item.id === itemId.toString());
    
          if (focusedItem) {
            setFocusedItemDetails({
              link:image.link,
              id: focusedItem.id,
              gender: focusedItem.gender,
              masterCategory: focusedItem.masterCategory,
              subCategory: focusedItem.subCategory,
              articleType: focusedItem.articleType,
              baseColour: focusedItem.baseColour,
              season: focusedItem.season,
              year: focusedItem.year,
              usage: focusedItem.usage,
              name: focusedItem.productDisplayName,
            });
          }
        } catch (error) {
          console.error('Error fetching focused item details:', error);
        }
    }

    useEffect(() => {
        fetchRecommendations();
    }, [focusedItemDetails]);

    useEffect(() => {
            fetchFocusedItemDetails(item);
    }, [item]);

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
                                                {focusedItemDetails?.name}
                                            </div>
                                            <img
                                                src={focusedItemDetails.link}
                                                alt={focusedItemDetails.name}
                                                className="w-auto h-[36rem] object-cover mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                    </div>
                                    <div className='p-4 w-[40%]'>
                                        <h2 className="text-center text-white text-2xl font-bold mb-2">{focusedItemDetails?.name}</h2>
                                        <p className='text-lg font-semibold text-center'>{focusedItemDetails?.articleType}</p>

                                        <div className='flex items-center ml-4'>
                                            <div className="flex items-center mt-4 border-white border-2 rounded-lg w-16 ml-8">
                                                <span className="ml-2">4.0</span>
                                                <FaStar className="h-5 w-5 ml-1 text-white" />
                                            </div><span className="ml-2 mt-4">Based on 30 ratings</span>
                                        </div>
                                        <div className='flex'>
                                            <span className="ml-12 mt-3 text-white text-2xl font-bold mb-2">&#8377; 839</span>
                                            <span className="ml-2 mt-5 text-white text-md font-normal mb-2">MRP <span className="line-through">1429</span></span>
                                        </div>
                                        <div className='flex mt-5 gap-8 border-b border-white py-4 pb-10'>
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
                                            <div className=" mt-8 text-white ml-3">
                                                <div className='text-xl font-bold'> Product Information :</div>

                                                <div className='grid grid-cols-2 gap-3 mt-3'>
                                                    <div className='text-sm font-bold'>
                                                        Category
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.masterCategory}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Sub Category
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.subCategory}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Gender
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.gender}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Colour
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.baseColour}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Usage
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.usage}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Season
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.season}
                                                        </div>
                                                    </div>
                                                    <div className='text-sm font-bold'>
                                                        Product ID
                                                        <div className='text-lg font-normal'>
                                                        {focusedItemDetails.id}
                                                        </div>
                                                    </div>
                                                 </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}



                            <div className="mt-5">
                                <div className='text-2xl font-bold'>Similar Products</div>
                                <div className="grid-cols-4">
                                    {recommendations.slice(1, 5).map((product) => (
                                        <div key={product.id} className="w-[18rem] h-auto inline-block m-4" onClick={()=>{nav(`/${product.id}`)}}>
                                            <img
                                                src={product.link}
                                                alt={product.name}
                                                className=" h-auto object-cover mb-2 rounded-lg cursor-pointer"
                                            />
                                            <p className="text-sm font-semibold text-white text-center whitespace-nowrap">{product.name.slice(0,35)}{product.name.length>35?"...":""}</p>
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
