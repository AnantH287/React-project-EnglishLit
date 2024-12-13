import React ,{useState} from 'react'
import css from './Nav.css'
import {Link} from 'react-router-dom'
import {FaBars , FaTimes, FaHome} from 'react-icons/fa'
const Nav = () => {
   const [icon,setIcon]=useState(false)
   const handleClick=()=>{
    setIcon(!icon)
   }
   const closeSide=()=>{
    setIcon(false)
   }
  return (
    <>
    <nav className='navbar'>
        <Link to={'/'} className='nav-logo' onClick={closeSide}><FaHome className='fa-times'></FaHome></Link>
        <div className='menu-icon' onClick={handleClick}>
            {
                
            icon?<FaTimes className='fa-times'></FaTimes>:<FaBars className='fa-bars'></FaBars>
            }
        </div>
        <ul className={
            icon? 'nav-menu active':
            'nav-menu'
        }>
        <li>
            <Link to={'/'} className='nav-links'onClick={closeSide}>Home</Link>
        </li>
        <li>
            <Link to={'/about'} className='nav-links'onClick={closeSide}>About</Link>
        </li>        
        <li>
            <Link to={'/letsgo'} className='nav-links'onClick={closeSide}>Let's Go</Link>
        </li>
        <li>
            <Link to={'/career'} className='nav-links'onClick={closeSide}>Career</Link>
        </li>
        <li>
            <Link to={'/admin'} className='nav-links'onClick={closeSide}>SignUp</Link>
        </li>
        </ul>
    </nav>
    </>
)
}

export default Nav
