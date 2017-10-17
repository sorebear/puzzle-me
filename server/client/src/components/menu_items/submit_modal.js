import React, { Component } from 'react';

class SubmitModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input : "",
            error: true
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(event) {
        const newValue = event.target.value;
        this.props.updatePuzzleName(newValue)
        this.setState({
            input : newValue,
            error: false
        })
    }
    handleSubmit() {
        if (this.state.input.length === 0) {
            this.setState({
                error: true
            })
        } else {
            this.props.submit(this.state.input);
        }
    }
    render() {
        const { isSubmitted, closeModal, showModal } = this.props
        const { input, error } = this.state
        return (
            <div className={showModal}>
                <div onClick={closeModal}></div>
                <div className="card p-5">
                    <div className="card-body">
                        <h4 className="card-title text-center">{isSubmitted ? `"${input}" Successfully Submitted!` : 'Name Your Puzzle:'}</h4>
                        <div className="card-text">
                            <div className={`form-group has-${error ? 'danger' : 'primary'} ${isSubmitted ? 'd-none' : ''}`}>
                                <input 
                                    onBlur={() => this.props.updatePuzzleName(input)} 
                                    onChange={(e) => this.handleInput(e)} type="text" 
                                    className="form-control form-control-danger" value={input} 
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="button" onClick={closeModal} className="m-2 btn btn-outline-danger">{isSubmitted ? 'Close' : 'Cancel'}</button>
                            <button type="button" onClick={this.handleSubmit} className={`m-2 btn btn-outline-primary ${isSubmitted ? 'd-none' : ''}`}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitModal;