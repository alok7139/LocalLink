import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Gardening() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();
  
  const [garden, setgarden] = useState([])

  useEffect(() => {
     const fetchgarden = async() => {
         try {
          await axios.get("http://localhost:3000/api/v1/get/all/garden" , {withCredentials:true})
          .then((res) => {
            console.log(res.data)
            setgarden(res.data)
          })
         } catch (error) {
            toast.error(error.response.data.message);
         }
     }
     fetchgarden();
  } , [])



  // if(!isauthenticated){
  //   navigate('/login');
  // }

  return (

    <div className='mt-48 mb-20 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-4xl font-bold font-serif text-center'>Garden Service</h1>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div className='bg-gray-100'>
            {
              isauthenticated ? 
              <Link to={'/post/garden/service'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Post Service</h1></button></Link>
              : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Post Service</button>
            }
          </div>
           {isauthenticated ?
            <Link to={'/your/service'}> <button className='p-2 text-blue-500 cursor-pointer'>Get Your Service</button></Link>
            : <button className='p-2 text-gray-500 cursor-not-allowed'>Get Your Service</button> 
          }
        </div>
      </div>

      <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
        {garden.gardens && garden.gardens.map((item) => (
          <div 
            key={item._id} 
            className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]'>
            <div>
              <img src={item.gardensvg.url} alt="garden" className='w-full h-36 object-cover rounded-t-lg' />
            </div>
            <div className='p-3'>
              <p className='font-bold text-lg'> <span className='font-thin'>Owner Name : </span> {item.houseowner}</p>
              <p className='font-bold text-lg'> <span className='font-thin'>Posted Date : </span> {new Date(item.posteddate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Expected Salary : </span> {item.salary} Rs</p>
              <p className='font-bold text-lg'><span className='font-thin'>Phone No. : </span> {item.phone}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span> {item.address} {" , "} {item.city}</p>
            </div>
            
            {
            isauthenticated ? 
            <Link to={`/garden/service/${item._id}`}>
            <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book</button>
          </Link> :
           <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book</button>
          }
             
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gardening
