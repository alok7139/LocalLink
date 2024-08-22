import { lazy, Suspense, useState } from 'react'
import './App.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes , Route } from 'react-router-dom';
export const Home = lazy(() => import('./components/Home'));
export const Contact = lazy(() => import('./components/Contact'));
export const About = lazy(() => import('./components/About'));
export const Navbar = lazy(() => import('./components/Navbar'));
export const Footer = lazy(() => import('./components/Footer'));
// export const Loader = lazy(() => import('./components/Loader'));
import LOader from './components/Loader';


function App() {

  return (
    <>
       <Suspense fallback={<LOader/>}>
       <Navbar/>
       <Routes>
         <Route path="/"  element = {<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/about' element={<About/>}/>
       </Routes>
       <Footer/>
       <ToastContainer position='bottom-left' transition={Bounce} autoClose={5000}/>
       </Suspense>
    </>
  )
}

export default App
