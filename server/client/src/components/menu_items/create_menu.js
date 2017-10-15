import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './page_title';
import speckle_spackle from '../imgs/speckle_spackle.png';
import word_guess from '../imgs/word_guess.png';

export default () => {
    return (
        <div>
            <PageTitle backgroundImg="legos" color="white" text="CREATE" subText="choose a puzzle style to create"/>
            <div className="container mt-5">
                <div className="row justify-content-center ">
                    <div className="col-6 text-center">
                        <Link style={{textDecoration: "none"}} className="btn-block" to="/create/speckle_spackle">
                            <img src={speckle_spackle} style={{width : "inherit"}}/>
                            <p className="red-text">Speckle Spackle</p>
                        </Link>
                    </div>
                    <div className="col-6 text-center">
                        <Link style={{textDecoration: "none"}} className="btn-block" to="/create/word_guess">
                            <img src={word_guess} style={{width : "inherit"}}/>
                            <p className="red-text">Word Guess</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}