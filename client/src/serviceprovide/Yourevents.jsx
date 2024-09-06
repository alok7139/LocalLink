import React, { useContext } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';

function Yourevents() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();


  if(!isauthenticated){
    return <Navigate to={'/login'} />
  }

  return (
    <div className='mt-48'>
      yourevents
    </div>
  )
}

export default Yourevents
