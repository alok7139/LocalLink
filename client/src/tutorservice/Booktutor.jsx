import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, useParams , useNavigate } from 'react-router-dom';

function Booktutor() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const {id} = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [classtype, setclasstype] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [error, seterror] = useState({name:'' , classtype:'' , phone:'' , email:'' })

  const validationForm = () => {
      const newerror = {};
      if(!name){
        newerror.name = 'Student Name is required';
      }
      if(!classtype){
        newerror.classtype = 'Student Class is required'
      }
      if(!phone){
        newerror.phone = 'Phone Number is required'
      }
      if(!email){
        newerror.email = 'Email is required'
      }
      return newerror
  }

  const handlebook = async(e) => {
      e.preventDefault();
      const validateform = validationForm();
      if(Object.keys(validateform).length > 0){
        seterror(validateform);
        return;
      }

      try {
        await axios.post(`https://locallink.onrender.com/api/v1/book/tutor/service/${id}` , {name,email,phone,classtype}  , {withCredentials:true , headers:{"Content-Type" : "application/json"}} )
        .then((res) => {
          toast.success(res.data.message);
          setname('')
          setemail('')
          setphone('')
          setclasstype('');
        })
      } catch (error) {
        toast.error(error.response.data.message);
      }

  }

  if(!isauthenticated){
    return navigate('/login')
  }



  return (
    <section className="px-4 sm:px-10 py-6 sm:py-10 mt-40 font-serif mb-10">
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-2xl" onSubmit={handlebook}>
        <h2 className="text-center mb-6 sm:mb-9 mt-5 text-2xl sm:text-4xl font-bold overflow-hidden">Book Your Event</h2>
        <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-7">
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={name}
              placeholder="Name"
              className={`text-black ${error.name ? 'border-red-500' : 'border-gray-300'} w-full p-3 border bg-white rounded-lg`}
              onChange={(e) => setname(e.target.value)} 
            />
            {error.name && <p className='text-red-500 text-sm mt-1'>{error.name}</p>}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className={`text-black ${error.email ? 'border-red-500' : 'border-gray-300'} w-full p-2 border bg-white rounded-lg`}
              onChange={(e) => setemail(e.target.value)}
            />
            {error.email && <p className='text-red-500 text-sm mt-1'>{error.email}</p>}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={phone}
              placeholder="Phone Number"
              className={`text-black ${error.phone ? 'border-red-500' : 'border-gray-300'} w-full p-2 border bg-white rounded-lg`}
              onChange={(e) => setphone(e.target.value)}
            />
            {error.phone && <p className='text-red-500 text-sm mt-1'>{error.phone}</p>}
          </div>

          <div className="flex flex-col w-full">
            <input
              type="text"
              value={classtype}
              placeholder="Student Class"
              className={`text-black ${error.classtype ? 'border-red-500' : 'border-gray-300'} w-full p-2 border bg-white rounded-lg`}
              onChange={(e) => setclasstype(e.target.value)}
            />
            {error.classtype && <p className='text-red-500 text-sm mt-1'>{error.classtype}</p>}
          </div>
        </div>
        
       
            <button className="w-full bg-black text-white py-2 rounded-lg font-serif text-xl focus:outline-none focus:ring-2 focus:ring-black shadow-2xl" type="submit">
          Book Service
        </button>
        
        
      </form>
    </div>
  </section>
  )
}

export default Booktutor
