import React, { Component } from 'react';
import infoObject from './info_object';

class InfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoObjectValue : infoObject[props.currentPath],
            infoIndex : 0
        }
        this.incrementInfoIndex = this.incrementInfoIndex.bind(this);
    }
    componentWillMount() {
        this.setState({
            infoObjectValue : infoObject[this.props.currentPath],
            infoIndex : 0
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            infoObjectValue : infoObject[nextProps.currentPath],
            infoIndex : 0
        })
    }
    incrementInfoIndex() {
        const newIndex = this.state.infoIndex + 1;
        if (newIndex >= this.state.infoObjectValue.tutorial.length) {
            this.setState({ infoIndex : 0 })
        } else {
            this.setState({ infoIndex : newIndex })
        }
    }
    render() {
        const { infoObjectValue, infoIndex } = this.state;
        return (
            <div className={this.props.showModal}>
                <div className={this.props.showModal} onClick={this.props.closeModal}></div>
                <div className="card px-5 pt-5 text-center">
                    <div className="card-body pb-1">
                        <h4 className="card-title">{infoObjectValue.name}</h4>
                        <img src={infoObjectValue.tutorial[infoIndex].animation} style={{width: "100%", maxWidth: "300px"}}/>
                        <p className="mt-2">{infoObjectValue.tutorial[infoIndex].text}</p>
                        <button type="button" onClick={this.props.closeModal} className="m-2 btn btn-outline-danger">Close</button>
                        <button type="button" onClick={this.incrementInfoIndex} className="m-2 btn btn-outline-primary">Next</button>
                        <div className="py-2">
                            <i onClick={this.props.toggleAutoInfo} className={`fa text-${this.props.autoInfo ? 'primary fa-check' : 'danger fa-times'}`}>
                                {this.props.autoInfo ? ' Auto-Info Enabled' : ' Auto-Info Disabled'}
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoModal;