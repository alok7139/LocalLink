import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Yourservice() {

    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [usergarden, setusergarden] = useState([])

    useEffect(() => {
        const fetchservice = async() => {
            try {
                await axios.get("http://localhost:3000/api/v1/get/user/garden" , {withCredentials:true})
                .then((res) => {
                    setusergarden(res.data);
                })
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchservice();
    } , []);


    const deleteservice = async(id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/delete/${id}` , {withCredentials:true})
            .then((res) => {
                console.log(res);
                toast.success("Deleted Successfully");
                setusergarden((prevdata) => ({
                    ...prevdata , 
                    garden: prevdata.garden.filter((garden) => id !== garden._id)
                }) )
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
      <h1 className='text-4xl font-bold font-serif text-center'>Your Gardening Service</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {usergarden && usergarden.garden &&  usergarden.garden.length>0 ? usergarden.garden.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          <div>
            <img src={item.gardensvg.url} alt="garden" className='w-full h-72 object-cover rounded-t-lg' />
          </div>
          <div className='p-3'>
              <p className='font-bold text-lg'> <span className='font-thin'>Owner Name : </span> {item.houseowner}</p>
              <p className='font-bold text-lg'> <span className='font-thin'>Posted Date : </span> {new Date(item.posteddate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Expected Salary : </span> {item.salary} Rs</p>
              <p className='font-bold text-lg'><span className='font-thin'>Phone No. : </span> {item.phone}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span> {item.address} {" , "} {item.city}</p>
            </div>
          <div className='flex flex-col lg:flex-row gap-2 justify-center items-center mt-1'>
 
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full ' 
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
  )
}

export default Yourservice
