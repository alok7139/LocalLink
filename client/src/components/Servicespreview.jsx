import React from 'react';
import { Link } from 'react-router-dom';

const NeighborhoodFeatures = () => {
  return (
    <div className="mt-12 ">
      <div className="flex flex-col justify-center items-center text-center m-5 p-5">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            <span className="block">Get the most out of</span>
            <span className="block">your neighborhood</span>
            <span className="block text-purple-800">with LocalLink</span>
          </h1>
        </div>

        
    </div>
    </div>
  );
};

const Feature = ({ title, description }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between md:text-xl justify-center gap-5 md:gap-4">
    <h1 className="font-bold left-5 text-2xl md:text-3xl text-purple-700 whitespace-nowrap">{title}:</h1>
    <p className="mt-1 text-center md:text-left text-gray-600 max-w-none md:max-w-full">{description}</p>
  </div>
);

export default NeighborhoodFeatures;
