import React from 'react'
import { createContext } from 'react'
import RouteCom from '../Component/RouteCom';
import { useState } from 'react';

const HeaderContextApi = createContext(null);

const HeaderContext = () => {
    const [headerValue, setHeaderValue] = useState('ashish');
    return (
        <div>
            <HeaderContextApi.Provider value={headerValue}>
                <RouteCom />
            </HeaderContextApi.Provider>
        </div>
    )
}

export default HeaderContext
export { HeaderContextApi }; 