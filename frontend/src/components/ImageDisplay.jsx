import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const ImageDisplay = () => {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/random_recommendations');
      const data = await response.json();

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

  return (
    <div>
      <h2>Random Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <img src={recommendation.link} alt={recommendation.name} style={{ maxWidth: '300px' }} />
              <p>{recommendation.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default ImageDisplay;
