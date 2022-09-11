import React from 'react'
import './Body.css';
import CurrentMarket from './CurrentMarket/CurrentMarket';
import Nav from './Nav/Nav';

function Body() {
    return (
        <div className="bg-323234 position-absolute w-100">
            <Nav />
            <CurrentMarket />
        </div>
    )
}

export default Body;