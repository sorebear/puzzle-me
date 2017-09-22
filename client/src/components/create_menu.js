import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './page_title';
import speckle_spackle from './imgs/speckle_spackle.png';
import word_guess from './imgs/word_guess.png';
import unblock_me from './imgs/unblock_me.png'

export default () => {
    return (
        <div>
            <PageTitle backgroundImg="legos" color="white" text="CREATE" subText="choose a puzzle style to create"/>
            <div className="container">
                <h3 className="text-center m-4">Choose A Puzzle Style To Create</h3>
                <div className="row">
                    <div className="col-1 col-sm-4">
                        <Link className="btn-block" to="/create/speckle_spackle">
                            <img src={speckle_spackle} className="d-none d-sm-block" style={{width : "inherit"}}/>
                            <button className="btn btn-outline-danger btn-block d-none d-sm-block p-2">Speckle Spackle</button>
                        </Link>
                    </div>
                    <div className="col-10 col-sm-4">
                        <img src={unblock_me} className="d-none d-sm-block" style={{width : "inherit"}}/>
                        <button className="btn btn-outline-danger btn-block d-none d-sm-block">Unblock Me</button>
                        <div className="row d-block d-sm-none">
                                <img className="col-6" src={speckle_spackle} style={{width : "inherit"}}/>
                                <img className="col-6" src={unblock_me} style={{width : "inherit"}}/>

                        </div>
                        <div className="row d-block d-sm-none">
                            <img className="col-6 offset-3" src={word_guess} style={{width : "inherit"}}/>
                        </div>
                    </div>
                    <div className="col-1 col-sm-4">
                        <Link className="btn-block" to="/create/word_guessing">
                            <img src={word_guess} className="d-none d-sm-block" style={{width : "inherit"}}/>
                            <button className="btn btn-outline-danger btn-block d-none d-sm-block">Word Guess</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}