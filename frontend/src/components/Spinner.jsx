import React from 'react';
import loading from '../assets/Spinner.gif'

const Spinner = () => {
    return (
        <div className="spinner-container w-100 text-center">
            <img style={{fontSize:'100px'}} src={loading} alt="Loading..." className="spinner" />
        </div>
    );
}

export default Spinner;