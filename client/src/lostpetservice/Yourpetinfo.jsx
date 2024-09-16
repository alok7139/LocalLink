import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Yourpetinfo() {
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [allpet, setallpet] = useState([])

    useEffect(() => {
       const fetchpet = async() => {
           try {
            await axios.get("https://locallink.onrender.com/api/v1/all/user/pet" , {withCredentials:true})
            .then((res) => {
                setallpet(res.data);
            })
           } catch (error) {
               toast.error(error.response.data.message);
           }
       }
       fetchpet();
    } , [])


    const deletepet = async(id) => {
        try {
            await axios.delete(`https://locallink.onrender.com/api/v1/delete/pet/post/${id}`  , {withCredentials:true})
            .then((res) => {
                
                setallpet((prevdata) => ({
                    ...prevdata,
                    getalluserpet: prevdata.getalluserpet.filter(
                        (getalluserpet) => id !== getalluserpet._id
                    ),
                }));
                toast.success(res.data.message);
                
            })
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }



    if(!isauthenticated){
        return navigate('/login');
    }


  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Your Pet Details</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {allpet && allpet.getalluserpet &&  allpet.getalluserpet.length>0 ? allpet.getalluserpet.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          <div>
            <img src={item.petsvg.url} alt="garden" className='w-full h-72 object-cover rounded-t-lg' />
          </div>
          <div className='p-3'>
              <p className='font-bold text-lg'><span className='font-thin'>Pet owner : </span> {item.petowner}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Pet Name : </span> {item.petname}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Owner Phone No. : </span> {item.phone}</p>
              {/* <p className='font-bold text-lg'><span className='font-thin'>Reward : </span> {item.reward} Rs</p> */}
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span>{item.address} {" , "} {item.city}</p>
            </div>

            {/* <p className='text-center mt-1 mb-1 font-serif text-red-500'>{item.message}</p>
            <p className='font-bold text-lg text-center '><span className='font-bold text-blue-400 underline'>Substantial Reward</span>: {item.reward} Rs</p> */}

          <div className='flex flex-col lg:flex-row gap-2 justify-center items-center mt-1'>
 
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full ' 
    onClick={() => deletepet(item._id)}>
    Delete
  </button>

</div>

        </div>
      ))  :
      <h1>You didn't post any event yet</h1> 
      }
    </div>
  </div>
  )
}

export default Yourpetinfo
