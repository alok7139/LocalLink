import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function YourHandymanservice() {

  const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [handymanservice, sethandymanservice] = useState([])

    useEffect(() => {
      const fetchservice = async() => {
            try {
              await axios.get("https://locallink.onrender.com/api/v1/get/alluser/service" , {withCredentials:true})
              .then((res) => {
                  sethandymanservice(res.data);
              })
            } catch (error) {
               toast.error(error.response.data.message);
            }
      }
      fetchservice();
    } , [])

    const deleteservice = async(id) => {
         try {
           await axios.delete(`https://locallink.onrender.com/api/v1/delete/handyman/${id}` , {withCredentials:true})
           .then((res) => {
            sethandymanservice((prevdata) => ({
              ...prevdata ,
              handymanservice: prevdata.handymanservice.filter((handymanservice) => id !== handymanservice._id)
            }))
            toast.success(res.data.message);
           }) 
         } catch (error) {
           toast.error(error.response.data.message)
         }
    }

    if(!isauthenticated){
      return navigate('/');
    }

  return (
    <>
       <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Your Service</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {handymanservice && handymanservice.handymanservice &&  handymanservice.handymanservice.length>0 ? handymanservice.handymanservice.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          <div className='p-3'>
            <p className='font-bold text-lg'><span className='font-thin'>Handyman Provider Name : </span> {item.name}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Handyman Type : </span> {item.typeofservice}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Address : </span> {item.address}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Service Fee : </span>{item.fee}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Phone Number : </span>{item.phone}</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-2 justify-between items-center mt-1'>
  <Link to={`/Update/handyman/${item._id}`} className='w-full lg:w-auto'>
    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto'>Update</button>
  </Link>
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto' 
    onClick={() => deleteservice(item._id)}>
    Delete
  </button>

</div>

        </div>
      ))  :
      <h1>You didn't post any event yet</h1> 
      }
    </div>
  </div>
    </>
  )
}

export default YourHandymanservice
