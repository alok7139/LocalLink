import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Lostpets() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [alllostpet, setalllostpet] = useState([])

  useEffect(() => {
     const fetchpet = async() => {
       try {
         await axios.get("http://localhost:3000/api/v1/all/pet" , {withCredentials:true})
         .then((res) => {
           setalllostpet(res.data);
         })
       } catch (error) {
         toast.error(error.response.data.message);
       }
     }

     fetchpet();
  } , [])
   

  return (
    <div className='mt-48 mb-20 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-4xl font-bold font-serif text-center'>Missing Pet</h1>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div className='bg-gray-100'>
            {
              isauthenticated ? 
              <Link to={'/missing/pet/info'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Missing Pet Details</h1></button></Link>
              : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Missing Pet Details</button>
            }
          </div>
           {isauthenticated ?
            <Link to={'/missing/your/pet'}> <button className='p-2 text-blue-500 cursor-pointer'>Your Pets Details</button></Link>
            : <button className='p-2 text-gray-500 cursor-not-allowed'>Your Pets Details</button> 
          }
        </div>
      </div>

      <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5 '>
        {alllostpet.getallpet && alllostpet.getallpet.map((item) => (
          <div 
            key={item._id} 
            className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
            <div>
              <img src={item.petsvg.url} alt={item.petname} className='w-full h-72 object-cover rounded-t-lg' />
            </div>
            <div className='p-3'>
              <p className='font-bold text-lg'><span className='font-thin'>Pet owner : </span> {item.petowner}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Pet Name : </span> {item.petname}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Owner Phone No. : </span> {item.phone}</p>
              {/* <p className='font-bold text-lg'><span className='font-thin'>Reward : </span> {item.reward} Rs</p> */}
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span>{item.address} {" , "} {item.city}</p>
            </div>
            <p className='text-center mt-1 mb-1 font-serif text-red-500'>{item.message}</p>
            <p className='font-bold text-lg text-center '><span className='font-bold text-blue-400 underline'>Substantial Reward</span>: {item.reward} Rs</p>
            
            {/* {
            isauthenticated ? 
            <Link to={`/book/event/${item._id}`}>
            <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book event</button>
          </Link> :
           <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book event</button>
          } */}
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lostpets
