import React from 'react';
import { Link } from 'react-router-dom';

const NeighborhoodFeatures = () => {
  return (
    <div className="mt-16 ">
      <div className="flex flex-col justify-center items-center text-center m-5 p-5">
        <div className=''>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            <span className="block">Get the most out of</span>
            <span className="block">your neighborhood</span>
            <span className="block text-purple-800">with LocalLink</span>
          </h1>
        </div>

        <div className='flex flex-row gap-5 mt-14'>
            <div className='flex flex-col justify-center items-center gap-3 border p-5 m-5 h-56 w-[70%] bg-transparent'>
               <h1 className='font-bold text-2xl text-purple-800'>Local Events</h1>
               <p className='font-serif text-lg flex justify-center items-center'>Users can create and participate in discussions about local events happening in their neighborhood, such as block parties, community meetings, or festivals.</p>
            </div> 
            
            <div className='flex flex-col justify-center items-center gap-3'>
               <h1 className='font-bold text-2xl text-purple-800'>Gardening Services</h1>
               <p className='font-serif text-lg flex justify-center items-center'>A dedicated section where neighbors can offer or inquire about gardening services, share tips, and discuss community gardening projects.</p>
            </div> 
            <div className='flex flex-col justify-center items-center gap-3'>
               <h1 className='font-bold text-2xl text-purple-800'>Lost Pets</h1>
               <p className='font-serif text-lg flex justify-center items-center'>A place to post and find information about lost or found pets in the neighborhood, helping reunite pets with their owners.</p>
            </div> 
        </div>

        <div className='flex flex-row lg:gap-6 gap-5 mt-14'>
            <div className='flex flex-col justify-center items-center gap-3'>
               <h1 className='font-bold text-2xl text-purple-800'>Tutoring</h1>
               <p className='font-serif text-lg flex justify-center items-center'>A space where neighbors can offer or seek tutoring services, whether it's for school subjects, languages, music lessons, or other educational needs.</p>
            </div> 
            <div className='flex flex-col justify-center items-center gap-3'>
               <h1 className='font-bold text-2xl text-purple-800'>Handyman</h1>
               <p className='font-serif text-lg flex justify-center items-center'>Users can ask for recommendations or offer handyman services, such as home repairs, electrical work, or plumbing, within the neighborhood.</p>
            </div> 
            <div className='flex flex-col justify-center items-center gap-3'>
               <h1 className='font-bold text-2xl text-purple-800'>Sales</h1>
               <p className='font-serif text-lg flex justify-center items-center'>Neighbors can list items they are selling or announce garage sales, making it easy to buy and sell within the community.</p>
            </div> 
        </div>

        
    </div>
    </div>
  );
};



export default NeighborhoodFeatures;
