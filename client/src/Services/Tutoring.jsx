import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Tutoring() {
   
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [alltutor, setalltutor] = useState([]);

  useEffect(() => {
      const fetchtutor = async() => {
        try {
          await axios.get("http://localhost:3000/api/v1/get/all/tutor" , {withCredentials:true})
          .then((res) => {
            setalltutor(res.data);
          })
        } catch (error) {
           toast.error(error.response.data.message);
        }
      }
      fetchtutor();
  } , [])




  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Tutor Service</h1>
      <div className='flex flex-row justify-center items-center gap-4'>
        <div className='bg-gray-100'>
          {
            isauthenticated ? 
            <Link to={'/create/service/tutor'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Post Tutor Service</h1></button></Link>
            : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Post Tutor Service</button>
          }
        </div>
         {isauthenticated ?
          <Link to={'/your/tutor/service'}> <button className='p-2 text-blue-500 cursor-pointer'>Get Your Service</button></Link>
          : <button className='p-2 text-gray-500 cursor-not-allowed'>Get Your Service</button> 
        }
      </div>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {alltutor.getalltutor && alltutor.getalltutor.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          {/* <div>
            <img src={item.localeventsvg.url} alt={item.localeventname} className='w-full h-72 object-cover rounded-t-lg' />
          </div> */}
          <div className='p-3'>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Provider Name : </span> {item.tutorname}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Type : </span> {item.typeoftutor}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Subject : </span> {item.subject}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Fee : </span>{item.tutorfee} {item.time}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Phone Number : </span>{item.phone}</p>
          </div>
          
          {
          isauthenticated ? 
          <Link to={`/book/tutor/service/${item._id}`}>
          <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book Service</button>
        </Link> :
         <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book Service</button>
        }
           
        </div>
      ))}
    </div>
  </div>
  )
}

export default Tutoring
