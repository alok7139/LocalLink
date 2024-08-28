import { createContext, StrictMode , useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

export const Context = createContext({isauthenticated:false})

const Appwrapper = () => {
  const [isauthenticated, setisauthenticated] = useState(false)
  const [ user , setuser] = useState({});

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
