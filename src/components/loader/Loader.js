import React from 'react';

import './loader.css';

export const Loader = () => {
    
    return (
        <div>
            <div data-test="main-container">
                <div className="lds-ellipsis">
                    <img src="/images/logos/logo-white.svg" alt="01 loader" data-test="icon" className='loader_icon'/>
        
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>   

        </div>
    )
};

export default Loader;
