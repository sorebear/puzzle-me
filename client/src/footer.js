import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu : '0',
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    componentWillReceiveProps() {
        this.setState({menu : '0'})
    }
    toggleMenu() {
        if (this.state.menu === '0') {
            this.setState({menu : '-88%'})
        } else {
            this.setState({menu : '0'})
        }
    }
    render() {
        const { menu } = this.state;
        return (
            <div style={{width: "200%"}}>
                <ul className="nav justify-content-around align-items-center footer" style={{width: "100%"}}>
                    <li className="nav-item">
                        <NavLink to="/home" className="nav-link" >
                            <i className="icon-style fa fa-home" onClick={() => this.props.updateCurrentPath("home")}></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/play" className="nav-link" >
                            <i className="icon-style fa fa-play" onClick={() => this.props.updateCurrentPath("play_menu")}></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create"  className="nav-link" >
                            <i className="icon-style fa fa-pencil" onClick={() => this.props.updateCurrentPath("create_menu")}></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/rankings" className="nav-link" >
                            <i className="icon-style fa fa-signal" onClick={() => this.props.updateCurrentPath("rankings")}></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link" >
                            <i className="icon-style fa fa-user" onClick={() => this.props.updateCurrentPath("profile")}></i>
                        </NavLink>
                    </li>
                    <li className={`nav-item ${this.props.mode === 'home' ? 'd-none' : ''}`}>
                        <div className="nav-link pr-0">
                            <i onClick={this.toggleMenu} className="icon-style fa fa-arrow-circle-o-left" style={{color: "#222"}}></i>
                        </div>
                    </li>
                    
                    <ul className="nav justify-content-between align-items-center footer px-3" style={{width: "100%", right: `${(this.props.mode === 'create' ? menu : '-125%')}`}}>
                        <i onClick={this.toggleMenu} className={`icon-style fa fa-arrow-circle-o-${menu === '0' ? 'right' : 'left'}`} style={{color: "white"}}></i>
                        <button className="btn btn-outline-secondary" onClick={this.props.clickHandlers[0]}>Test Play</button>
                        <i className="icon-style fa fa-arrow-circle-o-right" style={{color: "#222"}}></i>
                    </ul>

                    <ul className="nav justify-content-between align-items-center footer px-3" style={{width: "100%", right: `${(this.props.mode === 'testplay' ? menu : '125%')}`}}>
                        <i onClick={this.toggleMenu} className={`icon-style fa fa-arrow-circle-o-${menu === '0' ? 'right' : 'left'}`} style={{color: "white"}}></i>
                        <button onClick={this.props.clickHandlers[1]} className="btn btn-outline-secondary">Edit</button>
                        <button onClick={this.props.clickHandlers[2]} className="btn btn-outline-secondary">Submit</button>
                        {/* <button onClick={this.props.clickHandlers[3]} className={`btn btn-outline-secondary ${clickHandlers[3] ? '' : 'd-none'}`}>Check</button> */}
                        <i className="icon-style fa fa-arrow-circle-o-right" style={{color: "#222"}}></i>
                    </ul>

                    <ul className="nav justify-content-between align-items-center footer px-3" style={{width: "100%", right: `${(this.props.mode === 'play' ? menu : '-125%')}`}}>
                        <i onClick={this.toggleMenu} className={`icon-style fa fa-arrow-circle-o-${menu === '0' ? 'right' : 'left'}`} style={{color: "white"}}></i>
                        <button onClick={this.props.clickHandlers[0]} className={`btn btn-outline-secondary ${this.props.clickHandlers[0] ? '' : 'd-none'}`}>Check Answer</button>
                        <i className="icon-style fa fa-arrow-circle-o-right" style={{color: "#222"}}></i>
                    </ul>
                </ul>
            </div>
        )
    }
}

export default Footer