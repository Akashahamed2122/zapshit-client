import React from 'react';
import logo from '../../assets/logo.png'

const ProfastLogo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo} alt="" />
            <h3 className='text-3xl font-extrabold'>Profast</h3>
        </div>
    );
};

export default ProfastLogo;