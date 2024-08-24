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

        <div className="flex flex-col justify-center items-center mt-10 space-y-8 max-w-4xl">
          <Feature
            title="Local Events"
            description="Users can create and participate in discussions about local events happening in their neighborhood, such as block parties, community meetings, or festivals."
          />
          <Feature
            title="Gardening"
            description="A dedicated section where neighbors can offer or inquire about gardening services, share tips, and discuss community gardening projects."
          />
          <Feature
            title="Lost Pets"
            description="A place to post and find information about lost or found pets in the neighborhood, helping reunite pets with their owners."
          />
          <Feature
            title="Tutoring"
            description="A space where neighbors can offer or seek tutoring services, whether it's for school subjects, languages, music lessons, or other educational needs."
          />
          <Feature
            title="Handyman"
            description="Users can ask for recommendations or offer handyman services, such as home repairs, electrical work, or plumbing, within the neighborhood."
          />
          <Feature
            title="Sales"
            description="Neighbors can list items they are selling or announce garage sales, making it easy to buy and sell within the community."
          />
        </div>

        <div className="mt-10 flex justify-center items-center">
          <Link to="#">
            <button className="rounded-lg bg-purple-800 m-4 text-xl text-white py-3 px-6 hover:bg-purple-700 transition duration-300">
              Sign up
            </button>
          </Link>
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
