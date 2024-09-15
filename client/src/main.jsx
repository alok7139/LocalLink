import { createContext, StrictMode , useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, json } from 'react-router-dom'

export const Context = createContext({isauthenticated:false})

const Appwrapper = () => {
  const [isauthenticated, setisauthenticated] = useState(false)
  const [ user , setuser] = useState({});

  useEffect(() => {
    const storeduser = JSON.parse(localStorage.getItem('user'))
    const storedauth = JSON.parse(localStorage.getItem('isauthenticated'))

    if(storedauth && storeduser){
      setisauthenticated(storedauth)
      setuser(storeduser)
    }
  } , [])

  useEffect(() => {
    localStorage.setItem('user' , JSON.stringify(user))
    localStorage.setItem('isauthenticated' , JSON.stringify(isauthenticated))
  } ,[user,isauthenticated])

  return (
    <Context.Provider value={{isauthenticated,setisauthenticated,user,setuser}}>  
      <App/>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Appwrapper />
    </BrowserRouter>
    
  </StrictMode>,
)
