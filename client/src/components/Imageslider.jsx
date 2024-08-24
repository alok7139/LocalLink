import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

    function nextSlide() {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    }
   
    function prevSlide() {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    }

  return (
    <div>
          <div>
            <h1 className='font-bold text-5xl   text-yellow-600 flex justify-center items-center mt-20'>Our Services</h1>
          </div>
            <div className="slider flex justify-evenly p-5 top-0  items-center mt-28">
                <div className="left-arrow bg-gray-200 hover:bg-gray-400 hover:text-white p-2 rounded-lg cursor-pointer" onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                {images.map(
                    (image, index) =>
                        current === index && (
                            <div key={index} className="slide flex justify-center">
                                <img className='w-[80%] cover-fit rounded-2xl' src={image.images} alt="images" />
                            </div>
                        )
                )}
                <div className="right-arrow bg-gray-200 hover:bg-gray-400 hover:text-white p-2 rounded-lg cursor-pointer" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
  );
};

export default ImageSlider;
