import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Updateevent() {
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const {id} = useParams();
    const [localeventname, setlocaleventname] = useState('')
    

    const handleupdate = async(id) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/update/event/${id}` , {} , {withCredentials:true})
        } catch (error) {
            
        }
    }


    if(!isauthenticated){
        return <Navigate to={'/login'} />
    }
  return (
    <div>
      Updateevent
    </div>
  )
}

export default Updateevent
