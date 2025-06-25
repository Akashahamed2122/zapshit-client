import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const ProfastLogo = () => {
    return (
        <Link to={`/`}>
        <div className='flex items-center'>
            <img src={logo} alt="" />
            <h3 className='text-3xl font-extrabold'>Profast</h3>
        </div>
        </Link>
    );
};

export default ProfastLogo;