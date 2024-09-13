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
              await axios.get("http://localhost:3000/api/v1/get/alluser/service" , {withCredentials:true})
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
           await axios.delete(`http://localhost:3000/api/v1/delete/handyman/${id}` , {withCredentials:true})
           .then((res) => {
            sethandymanservice((prevdata) => {
              
            })
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
      
    </>
  )
}

export default YourHandymanservice
