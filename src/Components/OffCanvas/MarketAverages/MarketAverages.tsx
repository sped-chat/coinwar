import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import './MarketAverages.css';

const MarketAverages = () => {

    const { year } = useSelector(
        (root: RootState) => root.game
    )

    return (
        <div id="prices" className="offcanvas offcanvas-top" aria-labelledby="prices">
            <div className="offcanvas-body market-averages" data-bs-toggle="offcanvas">
                <h3 className="xs-stats"><span className="xs-stats year">{year}</span> MARKET AVERAGES</h3>
                <div className="row">
                    <div className="col">
                        ADA<br />😭
                    </div>
                    <div className="col">
                        AAVE<br /><sup>﹩</sup>330
                    </div>
                    <div className="col">
                        ALCX<br /><sup>﹩</sup>1,010
                    </div>
                    <div className="col">
                        AMC<br /><sup>﹩</sup>30
                    </div>
                    <div className="col">
                        APE<br /><sup>﹩</sup>14
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        ATOM<br /><sup>﹩</sup>23
                    </div>
                    <div className="col">
                        AVAX<br /><sup>﹩</sup>68
                    </div>
                    <div className="col">
                        AXS<br /><sup>﹩</sup>80
                    </div>
                    <div className="col">
                        BNB<br /><sup>﹩</sup>355
                    </div>
                    <div className="col">
                        BTC<br /><sup>﹩</sup>37K
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        BOO<br /><sup>﹩</sup>5
                    </div>
                    <div className="col">
                        CAKE<br /><sup>﹩</sup>21
                    </div>
                    <div className="col">
                        COMP<br /><sup>﹩</sup>440
                    </div>
                    <div className="col">
                        <label>
                            <span>
                                DOGE<br />
                                <a rel='noreferrer' href="https://hubs.mozilla.com/cMzFjni?vr_entry_type=2d_now&default_material_quality=high&default_mobile_material_quality=high"
                                    target="_blank" className="depayland">
                                    🐈</a>
                            </span>
                        </label>
                    </div>
                    <div className="col">
                        DOT<br /><sup>﹩</sup>27
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        ETH<br /><sup>﹩</sup>2550
                    </div>
                    <div className="col">
                        FIL<br /><sup>﹩</sup>96
                    </div>
                    <div className="col">
                        FTM<br /><sup>﹩</sup>7
                    </div>
                    <div className="col">
                        FTX<br /><sup>﹩</sup>41
                    </div>
                    <div className="col">
                        GME<br /><sup>﹩</sup>164
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        ICP<br /><sup>﹩</sup>184
                    </div>
                    <div className="col">
                        LINK<br /><sup>﹩</sup>27
                    </div>
                    <div className="col">
                        LTC<br /><sup>﹩</sup>140
                    </div>
                    <div className="col">
                        MANA<br /><sup>﹩</sup>3
                    </div>
                    <div className="col">
                        MATIC<br /><sup>﹩</sup>6
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        MKR<br /><sup>﹩</sup>3K
                    </div>
                    <div className="col">
                        OATH<br /><sup>﹩</sup>5
                    </div>
                    <div className="col">
                        SAND<br /><sup>﹩</sup>4
                    </div>
                    <div className="col">
                        SHIB<br /><sup>﹩</sup>3
                    </div>
                    <div className="col">
                        SOL<br /><sup>﹩</sup>130
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        TRON<br /><sup>﹩</sup>4
                    </div>
                    <div className="col">
                        UNI<br /><sup>﹩</sup>22
                    </div>
                    <div className="col">
                        USDC<br /><sup>﹩</sup>1
                    </div>
                    <div className="col">
                        WAR<br /><sup>﹩</sup>99K
                    </div>
                    <div className="col">
                        XRP<br /><sup>﹩</sup>2
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketAverages;