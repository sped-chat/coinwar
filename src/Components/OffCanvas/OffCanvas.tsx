import React from 'react';
import './OffCanvas.css';
import MarketAverages from "./MarketAverages/MarketAverages"
import Rooms from './Rooms/Rooms';
import Privacy from './Privacy/Privacy';

const OffCanvas = () => {
    return (
        <>
            <MarketAverages />
            <Rooms />
            <Privacy />
        </>
    );
}

export default OffCanvas