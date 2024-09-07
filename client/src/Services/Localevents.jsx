import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Localevents() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [allevents, setallevents] = useState([]);

  useEffect(() => {
    const fetchevent = async () => {
      try {
        await axios.get("http://localhost:3000/api/v1/user/allevents", { withCredentials: true })
          .then((res) => {
            setallevents(res.data);
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchevent();
  }, []);

  // if (!isauthenticated) {
  //   navigate('/login');
  // }

  return (
    <div className='mt-48 mb-20 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-4xl font-bold font-serif text-center'>Local Events</h1>
        <div className='flex flex-row justify-center items-center gap-4'>
          <div className='bg-gray-100'>
            {
              isauthenticated ? 
              <Link to={'/create/event'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Post Events</h1></button></Link>
              : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Post Events</button>
            }
          </div>
           {isauthenticated ?
            <Link to={'/your/event'}> <button className='p-2 text-blue-500 cursor-pointer'>Get Your Events</button></Link>
            : <button className='p-2 text-gray-500 cursor-not-allowed'>Get Your Events</button> 
          }
        </div>
      </div>

      <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
        {allevents.events && allevents.events.map((item) => (
          <div 
            key={item._id} 
            className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]'>
            <div>
              <img src={item.localeventsvg.url} alt={item.localeventname} className='w-full h-36 object-cover rounded-t-lg' />
            </div>
            <div className='p-3'>
              <p className='font-bold text-lg'><span className='font-thin'>Event Name : </span> {item.localeventname}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Start Date : </span> {new Date(item.startdate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>End Date : </span> {new Date(item.enddate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span>{item.address} {" , "} {item.city}</p>
            </div>
            
            {
            isauthenticated ? 
            <Link to={`/book/event/${item._id}`}>
            <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book event</button>
          </Link> :
           <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book event</button>
          }
             
          </div>
        ))}
      </div>
    </div>
  );
}

export default Localevents;
