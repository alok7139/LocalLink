import React , { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import {  useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Createservice() {
    const { isauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [tutorname, settutorname] = useState('')
    const [tutorfee, settutorfee] = useState('')
    const [subject, setsubject] = useState('')
    const [typeoftutor, settypeoftutor] = useState('')
    const [time, settime] = useState('')
    const [phone, setphone] = useState('')
    const [error, seterrors] = useState({tutorname:'' , tutorfee:'' , subject:'' , time:'', phone:'' , typeoftutor:''});

    const validateform = () => {
        const newerrors = {};
        if(!tutorname){
          newerrors.tutorname = 'Tutor Provider Name is required';
        }
        if(!tutorfee){
          newerrors.tutorfee = 'Tutor Fee is required';
        }
        if(!subject){
          newerrors.subject = 'Subject is required';
        }
        if(!typeoftutor){
          newerrors.typeoftutor = 'Type oF Tutor is required';
        }
        if(!time){
          newerrors.time = 'Time is required';
        }
        if(!phone){
          newerrors.phone = 'Phone Number is required';
        }
        
        return newerrors;
      }

      const registerservice = async(e) => {
        e.preventDefault();

        const validationForm = validateform();
        if(Object.keys(validationForm).length > 0){
            seterrors(validationForm);
            return;
        }

        const formdata = new FormData();
        formdata.append("tutorname" , tutorname);
        formdata.append("tutorfee" , tutorfee);
        formdata.append("subject" , subject);
        formdata.append("typeoftutor" , typeoftutor);
        formdata.append("time" , time);
        formdata.append("phone" , phone);

        try {
            const res = await axios.post("https://locallink.onrender.com/api/v1/post/tutor/service" , formdata , {withCredentials:true , headers:{"Content-Type" : "application/json"}}  )
            toast.success(res.data);
            navigate('/tutoring')
        } catch (error) {
            toast.error(error.response.data.message);
        }
      }
      if(!isauthenticated){
        return navigate('/login')
      }

  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Tutor Service Information</h1>
    </div>
  
    <div className='flex flex-col justify-center items-start md:items-start lg:items-center'>
      
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <div className='flex flex-col w-full'>
        <select value={typeoftutor} onChange={(e) => settypeoftutor(e.target.value)} className={`w-full ${error.typeoftutor ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`} >
            <option value="" className='text-slate-300' >Tutor Type</option>
            <option value="Online Tutor">Online Tutor</option>
            <option value="Homework Helper">Homework Helper</option>
            <option value="Test Prep Tutor">Test Prep Tutor</option>
            <option value="Academics Tutor">Academics Tutor</option>
        </select>
        {error.typeoftutor && <p className='text-red-500 mt-2 text-sm'>{error.typeoftutor}</p>}
        </div>

        <div className='flex flex-col w-full'>
          <input
            type='text'
            className={`w-full ${error.tutorname ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
            value={tutorname}
            placeholder='Enter Provider Name'
            onChange={(e) => settutorname(e.target.value)}
            
          />
          {error.tutorname && <p className='text-red-500 mt-2 text-sm'>{error.tutorname}</p>}
          </div>
           <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full ${error.tutorfee ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
          value={tutorfee}
          placeholder='Enter the Tution Fee'
          onChange={(e) => settutorfee(e.target.value)}
        />
        {error.tutorfee && <p className='text-red-500 mt-2 text-sm'>{error.tutorfee}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.time ? 'border-red-500' : 'border-gray-300'}`}
          value={time}
          placeholder='Enter Fee structure based on hourly/daily/monthly rates'
          onChange={(e) => settime(e.target.value)}
        />
        {error.time && <p className='text-red-500 mt-2 text-sm'>{error.time}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.subject ? 'border-red-500' : 'border-gray-300'}`}
          value={subject}
          placeholder='Enter the Subject'
          onChange={(e) => setsubject(e.target.value)}
        />
        {error.subject && <p className='text-red-500 mt-2 text-sm'>{error.subject}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.phone ? 'border-red-500' : 'border-gray-300'}`}
          value={phone}
          placeholder='Enter the Phone Number'
          onChange={(e) => setphone(e.target.value)}
        />
        {error.phone && <p className='text-red-500 mt-2 text-sm'>{error.phone}</p>}
        </div>
        
      </div>
    </div>
  
    <div className='flex justify-center items-center'>
      <button
        onClick={registerservice}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Submit
      </button>
    </div>
  </div>
  ) 
}

export default Createservice
