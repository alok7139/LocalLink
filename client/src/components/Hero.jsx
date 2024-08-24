import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';


function Hero() {

  
  

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center mt-28 lg:mt-44 px-4 lg:px-10 pt-16 lg:pt-0'>
  <div className='flex flex-col lg:w-1/2'>
    <h1 className='font-bold text-3xl lg:text-4xl text-yellow-700'>
      "Connecting Neighbors, <span className='ml-4 md:ml-0'>Building Community"</span>
    </h1>
    
    {/* <p className=' mt-5 text-base lg:text-lg text-gray-600 font-sans'>
      <div className='flex flex-col text-lg lg:text-xl gap-1 font-serif'>
        <span>Join a <span className='text-violet-800 font-bold'>LocalLink</span> platform where neighbors come together to share, help, and grow.</span>
        <span>Whether it's funding, Handyman, or supporting small businesses,</span>
        <span>our platform brings people closer.</span>
      </div>
    </p> */}
    <p className=' mt-5 text-base lg:text-2xl text-gray-600 font-serif'>
  Join a <span className='text-violet-800 font-bold'>LocalLink</span> platform where neighbors come together to share, help, and grow. Whether it's Local Events, Handyman, or supporting small businesses, our platform brings people closer.
</p>

    
    <div className="mt-8 ">
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600">
        Join the Community
      </button>
    </div>
  </div>
  
  <div className='mt-10 lg:mt-0 lg:ml-10'>
    <img 
      src='https://www.cypherlearning.com/hubfs/blog/entrepreneurs/posts/2022/10/INDIE-blog-01-Top-4-online-community-platforms-for-knowledge-entrepreneurs.png' 
      className='rounded-3xl sm:w-full lg:w-[800px] h-auto'
    />
  </div>
</div>


   
  )
}

export default Hero
