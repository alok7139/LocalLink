import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updatetutor() {
  const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
       Updatetutor
    </div>
  )
}

export default Updatetutor
