import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Handyman() {

  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [handymanservice, sethandymanservice] = useState([])

  useEffect(() => {
      const fetchservice= async() => {
         try {
            await axios.get("http://localhost:3000/api/v1/get/all/service", {withCredentials:true})
            .then((res) => {
              sethandymanservice(res.data);
            })
         } catch (error) {
           toast.error(error.response.data.message);
         }
      }

      fetchservice();
  } , [])



  return (
    <div className='mt-48 mb-20 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-4xl font-bold font-serif text-center'>Garden Service</h1>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div className='bg-gray-100'>
            {
              isauthenticated ? 
              <Link to={'/create/handyman/service'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Post Service</h1></button></Link>
              : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Post Service</button>
            }
          </div>
           {isauthenticated ?
            <Link to={'/your/handyman/service'}> <button className='p-2 text-blue-500 cursor-pointer'>Get Your Service</button></Link>
            : <button className='p-2 text-gray-500 cursor-not-allowed'>Get Your Service</button> 
          }
        </div>
      </div>

      <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
        {handymanservice.handymanservice && handymanservice.handymanservice.map((item) => (
          <div 
            key={item._id} 
            className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
            
            <div className='p-3'>
            <p className='font-bold text-lg'><span className='font-thin'>Handyman Provider Name : </span> {item.name}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Handyman Type : </span> {item.typeofservice}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Address : </span> {item.address}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Service Fee : </span>{item.fee}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Phone Number : </span>{item.phone}</p>
          </div>
            
            {/* {
            isauthenticated ? 
            <Link to={`#`}>
            <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book</button>
          </Link> :
           <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book</button>
          } */}
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default Handyman
