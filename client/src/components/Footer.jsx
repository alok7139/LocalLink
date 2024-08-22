import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";


function Footer() {
  return (
    <footer className='w-full'>
      <div> <img src='/logo2.png' alt='logo'/></div>
      <div>
        <h4>Support</h4>
        <ul className=''>
          <li>New Delhi , India</li>
          <li className='flex flex-row gap-2  text-sm'> <span className='text-sm sm:text-xl'><MdEmail/></span> Janseva7139@gmail.com</li>
          <li className='flex flex-row gap-2'> <span><FaPhone /></span> +91 8126936403</li>
        </ul>
      </div>
      <div>
        <h4>Links</h4>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/donate'}>Donate us</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4>Follow Us</h4>
        <ul>
          <li><Link to={'https://www.linkedin.com/in/alok-garg-7118b6257/'} target='_blank'> {" "}
          <span> <FaLinkedin/> </span>  <span>Linkedin </span>{" "}
          </Link> </li>
          <li><Link to={'https://github.com/alok7139'} target='_blank'> {" "}
          <span> <FaGithub/> </span>  <span>GitHub </span>{" "}
          </Link> </li>
          <li><Link to={'https://x.com/AlokGar76235535'} target='_blank'> {" "}
          <span> <FaTwitter/> </span>  <span>Twitter </span>{" "}
          </Link> </li>
          <li><Link to={'https://www.instagram.com/_garg_alok_/?hl=en'} target='_blank'> {" "}
          <span> <FaInstagram /> </span>  <span>Instagram </span>{" "}
          </Link> </li>
          
        </ul>
      </div>
    </footer>
  )
}

export default Footer
