import React from 'react';
import coloruko from './imgs/coloruko.png'

export default () => {
    return (
        <div className="top-4-display text-center container">Today's Top 4
            <div className="row">
                <div className="col-6 container">
                    <div className="card">
                        <img className="card-img-top" src={coloruko} alt="Card image cap" style={{width: "100%"}}/>
                        <div className="card-body">
                            <h4 className="card-title">Test Puzzle</h4>
                            <p className="card-text">Type: Coloruko<br/>Creator: Soarin' Eagle<br/>Created: 09/15/17</p>
                            <a href="#" className="btn btn-outline-primary">Play</a>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src={coloruko} alt="Card image cap" style={{width: "100%"}}/>
                        <div className="card-body">
                            <h4 className="card-title">Test Puzzle</h4>
                            <p className="card-text">Type: Coloruko<br/>Creator: Soarin' Eagle<br/>Created: 09/15/17</p>
                            <a href="#" className="btn btn-outline-primary">Play</a>
                        </div>
                    </div>
                </div>
                <div className="col-6 container">
                    <div className="card">
                        <img className="card-img-top" src={coloruko} alt="Card image cap" style={{width: "100%"}}/>
                        <div className="card-body">
                            <h4 className="card-title">Test Puzzle</h4>
                            <p className="card-text">Type: Coloruko<br/>Creator: Soarin' Eagle<br/>Created: 09/15/17</p>
                            <a href="#" className="btn btn-outline-primary">Play</a>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src={coloruko} alt="Card image cap" style={{width: "100%"}}/>
                        <div className="card-body">
                            <h4 className="card-title">Test Puzzle</h4>
                            <p className="card-text">Type: Coloruko<br/>Creator: Soarin' Eagle<br/>Created: 09/15/17</p>
                            <a href="#" className="btn btn-outline-primary">Play</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}