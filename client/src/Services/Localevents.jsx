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

  if (!isauthenticated) {
    navigate('/login');
  }

  return (
    <div className='mt-48 mb-20 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-3xl font-bold font-serif text-center'>Local Events</h1>
        <div className='flex flex-row justify-center items-center gap-4'>
          <p>Create Events</p>
          <p>Your Events</p>
          <p></p>
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
              <p className='font-bold text-lg'>{item.localeventname}</p>
              <p className='text-gray-500'>{new Date(item.startdate).toLocaleDateString()}</p>
              <p className='text-gray-500'>{new Date(item.enddate).toLocaleDateString()}</p>
              <p className='text-gray-500'>{item.city}</p>
            </div>
            <Link to={'#'}>
              <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book event</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Localevents;
