import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Bookevent() {
    
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [isbooked, setisbooked] = useState(false)
    const [errors, seterrors] = useState({name: '' , email: '' , phone:''})

   const validateform = () => {
    const newerror = {};
    if(!name){
        newerror.name = 'Name is required'
    }
    if(!email){
        newerror.email = 'Email is required'
    }
    if(!phone){
        newerror.phone = 'Phone Number is required'
    }

    return newerror;
   }

   const handleform = async(e) => {
    e.preventDefault();

    const validate=  validateform();
    if(Object.keys(validate).length > 0){
        seterrors(validate);
        return;
    }

    await axios.post(`https://locallink.onrender.com/api/v1/book/event/${id}` , {name,email,phone , isbooked:true} , {withCredentials:true , headers:{"Content-Type" : "application/json"}})
    .then((res) => {
        toast.success(res.data.message)
        setname('')
        setemail('')
        setphone('')
        setisbooked(false);
        navigate('/localevents')
    }).catch((error) => {
        toast.error(error.response.data.message);
    })


   }

    if(!isauthenticated){
        return navigate('/login');
    }

  return (
    <section className="px-4 sm:px-10 py-6 sm:py-10 mt-40 font-serif mb-10">
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-2xl" onSubmit={handleform}>
        <h2 className="text-center mb-6 sm:mb-9 mt-5 text-2xl sm:text-4xl font-bold overflow-hidden">Book Your Event</h2>
        <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-7">
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={name}
              placeholder="Name"
              className={`text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} w-full p-3 border bg-white rounded-lg`}
              onChange={(e) => setname(e.target.value)} 
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className={`text-black ${errors.email ? 'border-red-500' : 'border-gray-300'} w-full p-2 border bg-white rounded-lg`}
              onChange={(e) => setemail(e.target.value)}
            />
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={phone}
              placeholder="Phone Number"
              className={`text-black ${errors.phone ? 'border-red-500' : 'border-gray-300'} w-full p-2 border bg-white rounded-lg`}
              onChange={(e) => setphone(e.target.value)}
            />
            {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
          </div>
        </div>
        
       
            <button className="w-full bg-black text-white py-2 rounded-lg font-serif text-xl focus:outline-none focus:ring-2 focus:ring-black shadow-2xl" type="submit">
          Book Event
        </button>
        
        
      </form>
    </div>
  </section>
  )
}

export default Bookevent
