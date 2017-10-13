import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './page_title';
import speckle_spackle from './imgs/speckle_spackle.png';
import word_guess from './imgs/word_guess.png';

export default () => {
    return (
        <div>
            <PageTitle backgroundImg="legos" color="white" text="CREATE" subText="choose a puzzle style to create"/>
            <div className="container mt-5">
                <div className="row justify-content-center ">
                    <div className="col-6">
                        <Link style={{textDecoration: "none"}} className="btn-block" to="/create/speckle_spackle">
                            <img src={speckle_spackle} style={{width : "inherit"}}/>
                            <button className="btn red btn-block mt-2">Speckle Spackle</button>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link style={{textDecoration: "none"}} className="btn-block" to="/create/word_guess">
                            <img src={word_guess} style={{width : "inherit"}}/>
                            <button className="btn btn-block btn-small red mt-2">Word Guess</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}