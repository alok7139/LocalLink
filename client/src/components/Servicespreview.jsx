import React from 'react';

const NeighborhoodFeatures = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col justify-center items-center text-center m-5 p-5">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            <span className="block">Get the most out of</span>
            <span className="block">your neighborhood</span>
            <span className="block text-purple-800">with LocalLink</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-14 justify-center items-center">
          <FeatureBox title="Local Events">
            Users can create and participate in discussions about local events happening in their neighborhood, such as block parties, community meetings, or festivals.
          </FeatureBox>
          
          <FeatureBox title="Gardening Services">
            A dedicated section where neighbors can offer or inquire about gardening services, share tips, and discuss community gardening projects.
          </FeatureBox>

          <FeatureBox title="Lost Pets">
            A place to post and find information about lost or found pets in the neighborhood, helping reunite pets with their owners.
          </FeatureBox>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-14 justify-center items-center">
          <FeatureBox title="Tutoring">
            A space where neighbors can offer or seek tutoring services, whether it's for school subjects, languages, music lessons, or other educational needs.
          </FeatureBox>

          <FeatureBox title="Handyman">
            Users can ask for recommendations or offer handyman services, such as home repairs, electrical work, or plumbing, within the neighborhood.
          </FeatureBox>

          <FeatureBox title="Sell">
            Neighbors can list items they are selling or announce garage sales, making it easy to buy and sell within the community.
          </FeatureBox>
        </div>
      </div>
    </div>
  );
};

const FeatureBox = ({ title, children }) => (
  <div className="flex flex-col justify-center items-center gap-3 p-5 m-3 h-56 w-full lg:w-[30%] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
    <h1 className="font-bold text-2xl text-purple-800">{title}</h1>
    <p className="font-serif text-lg flex justify-center items-center text-gray-800">{children}</p>
  </div>
);

export default NeighborhoodFeatures;
