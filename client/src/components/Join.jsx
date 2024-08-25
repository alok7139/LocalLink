import React from 'react'
import { Link } from 'react-router-dom';

function Join() {
  return (
    <div className='flex justify-center items-center mt-16 mb-16'>
      <Link to={'#'}>
      <button
  className='flex justify-center items-center rounded-[10px] text-white text-xl p-[15px] m-5 min-w-[120px] min-h-[30px] bg-black
    shadow-2xl font-serif transition duration-300 ease-in-out transform  hover:scale-105'>
  Join us
</button>
      </Link>
       
       

    </div>
  )
}

export default Join
