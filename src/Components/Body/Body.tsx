import React from 'react'
import './Body.css';
import CurrentMarket from './CurrentMarket/CurrentMarket';
import Nav from './Nav/Nav';

function Body() {
    return (
        <>
            <Nav />
            <CurrentMarket />
        </>
    )
}

export default Body;