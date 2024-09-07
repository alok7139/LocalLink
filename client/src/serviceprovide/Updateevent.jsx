import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updateevent() {
  const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [localeventname, setlocaleventname] = useState('');
  const [startdate, setstartdate] = useState('');
  const [enddate, setenddate] = useState('');
  const [owner, setowner] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState('');
  const [city, setcity] = useState('');
  const [localeventsvg, setlocaleventsvg] = useState('');
  const [localeventsvgpreview, setlocaleventsvgpreview] = useState('');

  useEffect(() => {
    const fetchevent = async () => {
      try {
        const  response = await axios.get(`http://localhost:3000/api/v1/fetch/${id}`, { withCredentials: true });
        console.log(response);
        const eventData = response.data.events;
        // console.log(1);
        setlocaleventname(eventData.localeventname);
        // console.log(1);
        setstartdate(new Date(eventData.startdate).toISOString().split('T')[0]); 
        setenddate(new Date(eventData.enddate).toISOString().split('T')[0]);
        setowner(eventData.owner);
        setaddress(eventData.address);
        setphone(eventData.phone);
        setcity(eventData.city);
        setlocaleventsvg(eventData.localeventsvg.url)
        setlocaleventsvgpreview(eventData.localeventsvg.url);
      } catch (error) {
        console.error(error.response || error.message || "Unknown error");
        toast.error("Error fetching event data");
      }
    };

    fetchevent();
  }, [id]);

  const handlesvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setlocaleventsvg(file);
      setlocaleventsvgpreview(reader.result);
    };
  };

  const handleupdate = async () => {
    const formdata = new FormData();
    formdata.append('localeventname', localeventname);
    formdata.append('startdate', startdate);
    formdata.append('enddate', enddate);
    formdata.append('owner', owner);
    formdata.append('address', address);
    formdata.append('phone', phone);
    formdata.append('city', city);
    formdata.append('localeventsvg', localeventsvg);
    try {
      const events = await axios.put(
        `http://localhost:3000/api/v1/update/event/${id}`,
        formdata,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success(events.data.message);
      setlocaleventname('')
      setstartdate('')
      setenddate('')
      setphone('')
      setaddress('')
      setcity('')
      setowner('')
      setlocaleventsvg('');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isauthenticated) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
      <div className='flex justify-center flex-col items-center mb-10 gap-5'>
        <h1 className='text-2xl md:text-4xl font-bold text-center'>Update Event</h1>
      </div>

      <div className='flex flex-col md:flex-row gap-10 justify-center items-start md:items-center'>
        <div className='w-full md:w-1/3'>
          <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Event Preview</h2>
          <img
            src={
              localeventsvgpreview
                ? localeventsvgpreview
                : 'https://apps.odoo.com/web/image/loempia.module/89530/icon_image?unique=33fca66'
            }
            alt={localeventname}
            className='w-full h-64 object-cover rounded-sm'
          />
          <input type='file' className='mt-4' onChange={handlesvg} />
        </div>

        <div className='w-full md:w-2/3 space-y-4'>
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={localeventname}
            placeholder='Enter the Event Name'
            onChange={(e) => setlocaleventname(e.target.value)}
          />
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type='date'
              className='w-full sm:w-1/2 p-2 border rounded-lg'
              value={startdate}
              placeholder='Start Date'
              onChange={(e) => setstartdate(e.target.value)}
            />
            <input
              type='date'
              className='w-full sm:w-1/2 p-2 border rounded-lg'
              value={enddate}
              placeholder='End Date'
              onChange={(e) => setenddate(e.target.value)}
            />
          </div>
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={owner}
            placeholder='Enter the Event Holder Name'
            onChange={(e) => setowner(e.target.value)}
          />
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={address}
            placeholder='Enter the Address'
            onChange={(e) => setaddress(e.target.value)}
          />
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={phone}
            placeholder='Enter the Phone Number'
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={city}
            placeholder='Enter the City'
            onChange={(e) => setcity(e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-center items-center'>
      <button
        onClick={ handleupdate}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Update Event
      </button>
      </div>
    </div>
  );
}

export default Updateevent;
