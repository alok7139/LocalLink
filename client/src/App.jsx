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
import Localevents from './Services/Localevents';
import Lostpets from './components/Lostpets';
import Tutoring from './components/Tutoring';
import Handyman from './Services/Handyman';
import Sales from './components/Sales';


function App() {

  return (
    <>
       <Suspense fallback={<LOader/>}>
       <Navbar/>
       <Routes>
         <Route path="/"  element = {<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/localevents' element={<Localevents/>}/>
         <Route path='/lostpets' element={<Lostpets/>} />
         <Route path='/tutoring' element={<Tutoring/>} />
         <Route path='/handyman' element={<Handyman/>} />
         <Route path='/sales' element={<Sales/>} />
         <Route path='/lostpets' element={<Lostpets/>} />

       </Routes>
       <Footer/>
       <ToastContainer position='bottom-left' transition={Bounce} autoClose={5000}/>
       </Suspense>
    </>
  )
}

export default App
