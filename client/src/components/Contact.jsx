import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";


function Contact() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [message, setmessage] = useState("")
  const [errors, seterrors] = useState({name:'' , email:'' , phone:'' , message:''})

  const validateform = () => {
    const newerrors = {};
    if(!name){
      newerrors.name = 'Name is required';
    }
    if(!email){
      newerrors.email = 'Email is required';
    }
    if(!phone){
      newerrors.phone = 'Phone Number is required';
    }
    if(!message){
      newerrors.message = 'Message is required';
    }
    return newerrors
  }

  const handlemessage = async(e) => {
    e.preventDefault();
    const validationform = validateform();

    if(Object.keys(validationform).length > 0){
      seterrors(validationform);
      return;
    }

    await axios.post("https://locallink.onrender.com/api/v1/send/message" , {name , email,phone,message} , {withCredentials:true,headers:{"Content-Type" : "application/json"}})
    .then((res) => {
      setname("")
      setemail("")
      setmessage("")
      setphone("")
      toast.success(res.data.message)
    }).catch((error) => {
      toast.error(error.response.data.message);
    })

    
  }

  return (
    <>
    <section className="px-4 sm:px-10 py-6 sm:py-10 mt-40 font-serif mb-10">
  <div className="flex flex-col justify-center items-center">
    <form className="w-full max-w-2xl" onSubmit={handlemessage}>
      <h2 className="text-center mb-6 sm:mb-9 mt-5 text-2xl sm:text-4xl font-bold overflow-hidden">CONTACT US</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6 sm:mb-7">
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
      <div className="flex flex-col w-full mb-6">
        <textarea
          rows="4"
          value={message}
          placeholder="Message"
          className={`text-black ${errors.message ? 'border-red-500' : 'border-gray-300'} w-full p-2 border rounded-lg`}
          onChange={(e) => setmessage(e.target.value)}
        />
        {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
      </div>
      <button className="w-full bg-black text-white py-2 rounded-lg font-serif text-xl focus:outline-none focus:ring-2 focus:ring-black shadow-2xl" type="submit">
        Send Message
      </button>
    </form>
  </div>
</section>

</>

  )
}

export default Contact