import './Nav.css';
import React from 'react';
import { useSelector } from 'react-redux'
import Exchange from './Exchange/Exchange';
import { RootState } from '../../../Store';
import translate from '../../../Store/Translations';

function Nav() {
    const { currentExchage } = useSelector(
        (state: RootState) => state.game
    )

    return (
        <nav className="navbar sticky-top shadow-sm w-100">
            <div className="container-fluid justify-content-center">
                <a href="#" className="xs-stats align-text-top" data-bs-toggle="collapse" data-bs-target="#babybear"
                    aria-controls="babybear" aria-expanded="false" aria-label="exchanges">DEX&nbsp;&nbsp;:&nbsp;<span
                        className="dex">{translate('dex-' + currentExchage.name)}</span></a>
                <div className="collapse navbar-collapse" id="babybear">
                    <Exchange />
                </div>
            </div>
        </nav>
    )
}

export default Nav;