import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updatetutor() {
  const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

    const [tutorname, settutorname] = useState('')
    const [tutorfee, settutorfee] = useState('')
    const [subject, setsubject] = useState('')
    const [typeoftutor, settypeoftutor] = useState('')
    const [time, settime] = useState('')
    const [phone, setphone] = useState('')

    useEffect(() => {
      const fetchtutor = async() => {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/get/info/${id}` , {withCredentials:true})
            // console.log(response.data);
            const service = response.data.tutorservice;
            settutorname(service.tutorname);
            setsubject(service.subject);
            settutorfee(service.tutorfee);
            settypeoftutor(service.typeoftutor);
            settime(service.time);
            setphone(service.phone);  
          } catch (error) {
            toast.error(error.response.data.message);
          }
      }
      fetchtutor();
    } , [id])   
    
    const updateservice = async() => {
      const formdata = new FormData(); 
      formdata.append("tutorname" , tutorname);
      formdata.append("tutorfee" , tutorfee);
      formdata.append("subject" , subject);
      formdata.append("time" , time);
      formdata.append("phone" , phone);
      formdata.append("typeoftutor" , typeoftutor)
      try {
        await axios.put(`http://localhost:3000/api/v1/get/update/${id}` , formdata , {withCredentials:true , headers:{"Content-Type" : "application/json"}} )
        .then((res) => {
          toast.success(res.data.message);
          navigate('/your/tutor/service')
        })
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
    <h1 className='text-2xl md:text-4xl font-bold text-center'>Update Event</h1>
  </div>

  <div className='flex flex-col  justify-center items-start md:items-start lg:items-center'>
    

    <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
    <select value={typeoftutor} onChange={(e) => settypeoftutor(e.target.value)} className={`w-full p-2 border rounded-lg`} >
            <option value="" className='text-slate-300' >Tutor Type</option>
            <option value="Online Tutor">Online Tutor</option>
            <option value="Homework Helper">Homework Helper</option>
            <option value="Test Prep Tutor">Test Prep Tutor</option>
            <option value="Academics Tutor">Academics Tutor</option>
        </select>
      
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={tutorname}
        placeholder='Enter Provider Name'
        onChange={(e) => settutorname(e.target.value)}
      />
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={tutorfee}
        placeholder='Enter the Tution Fee'
        onChange={(e) => settutorfee(e.target.value)}
      />
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={time}
        placeholder='Enter Fee structure based on hourly/daily/monthly rates'
        onChange={(e) => settime(e.target.value)}
      />
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={subject}
        placeholder='Enter the Subject'
        onChange={(e) => setsubject(e.target.value)}
      />
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={phone}
        placeholder='Enter the Phone Number'
        onChange={(e) => setphone(e.target.value)}
      />
    </div>
  </div>

  <div className='flex justify-center items-center'>
    <button
      onClick={updateservice}
      className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
      Update Service
    </button>
  </div>
</div>
  )
}

export default Updatetutor
