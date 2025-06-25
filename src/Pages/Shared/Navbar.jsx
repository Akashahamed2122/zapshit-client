import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import ProfastLogo from './ProfastLogo';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Navbar = () => {

  const navigate = useNavigate()

  const {logOut,user}=useContext(AuthContext)


  const handleLogout = ()=>{
    logOut()
      .then(result=>{

        navigate('/')
        alert('logout success')
        
        console.log('logout success')
      })
      .catch(error=>{
        console.log(error.message)
      })
  }




    const navItems = <>

    <li><NavLink to={`/`}>Home</NavLink></li>
    <li><NavLink to={`/coverage`}>Coverage</NavLink></li>
    <li><NavLink to={`/about`}>About us</NavLink></li>
    
    </>


    return (
        <>
           <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItems}
      </ul>
    </div>
    <ProfastLogo></ProfastLogo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navItems}
    </ul>
  </div>
  <div className="navbar-end">
   {user?<button onClick={handleLogout}  className="btn"> <Link>Logout</Link></button>:<div><Link to={`/register`}><button className='btn'>signup</button></Link> <Link to={`/login`}><button className='btn'>Login</button></Link></div>}
  </div>
</div>
        </>
    );
};

export default Navbar;