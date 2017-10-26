import React from 'react';
import { NavLink } from 'react-router-dom';
import circle from '../imgs/circle.svg'

const iconObject = {
    login: "vpn_key",
    home: "home",
    play_menu: "play_arrow",
    speckle_spackle_play: "play_arrow",
    word_guess_play: "play_arrow",
    create_menu: "create",
    speckle_spackle_create: "create",
    word_guess_create: "create",
    rankings: "fitness_center",
    profile: "person"
}

export default (props) => {
    const { width, height, clickHandlers, currentTitle, currentPath, callModal, mode } = props;
    return (
        <div className="side-menu-container" style={{width: width, height: height, right: 0}}>
            <div className="side-menu">
                <div 
                    className="side-menu-header"
                    style={{transform: `translate(${currentTitle ? 0 : "700px"})`}}
                >
                    {currentTitle}
                </div>
                
                <div className="right-menu-icon" onClick={callModal}>
                    <img src={circle} />
                    <i className="material-icons icon-style">{iconObject[currentPath]}</i>
                </div>
                <div style={{position: "relative"}}>
                    <button 
                        onClick={clickHandlers[1]} 
                        className="btn side-menu-button"
                        style={{transform: `translate(${mode === "testplay" ? 0 : "700px"})`}}  
                    >
                        Edit
                        <i className="material-icons icon-style" style={{fontSize: "24px"}}>create</i>
                    </button>
                    <button 
                        onClick={clickHandlers[2]} 
                        className="btn side-menu-button"
                        style={{transform: `translate(${mode === "testplay" ? 0 : "700px"})`}}
                    >
                        Submit
                        <i className="material-icons icon-style" style={{fontSize: "24px"}}>send</i>
                    </button>
                    <button 
                        className="btn side-menu-button" 
                        onClick={clickHandlers[0]}
                        style={{
                            position: "absolute", 
                            top: 0,
                            transform: `translate(${mode === "create" ? 0 : "700px"})`
                        }}
                    >
                        Test Play
                        <i className="material-icons icon-style" style={{fontSize: "24px"}}>play_arrow</i>
                    </button>
                    <button 
                        onClick={clickHandlers[0]} 
                        className="btn side-menu-button"
                        style={{
                            position: "absolute", 
                            top: 0,
                            transform: `translate(${mode === "play" && clickHandlers[0] ? 0 : "700px"})`
                        }}
                    >
                        Check Answer
                        <i className="material-icons icon-style" style={{fontSize: "24px"}}>done</i>
                    </button>
                </div>
            </div>
        </div>
    )
}


