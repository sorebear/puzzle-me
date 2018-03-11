import React, { Component } from 'react';
import infoObject from '../info_modal/info_object';

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoObjectValue : null,
      infoIndex : 0,
    };
    this.incrementInfoIndex = this.incrementInfoIndex.bind(this);
  }
  incrementInfoIndex() {
    const newIndex = this.state.infoIndex + 1;
    if (newIndex >= this.state.infoObjectValue.tutorial.length) {
      this.setState({ infoIndex: 0 });
    } else {
      this.setState({ infoIndex: newIndex });
    }
  }
  updateInfoObject(value) {
    this.setState({
      infoObjectValue: infoObject[value],
    });
  }
  backToMain() {
    this.setState({ infoObjectValue: null });
  }
  render() {
    const { infoObjectValue, infoIndex } = this.state;
    if (!infoObjectValue) {
      return (
        <div className={this.props.showModal}>
          <div className={this.props.showModal} onClick={this.props.closeModal} />
          <div className="card px-5 pt-5 text-center">
            <div className="card-body pb-1">
              <h4 className="card-title">What Would You Like To Learn?</h4>
              <button onClick={() => this.updateInfoObject('speckle_spackle_play')} className="m-2 btn">Speckle Spackle</button>
              <button onClick={() => this.updateInfoObject('word_guess_play')} className="m-2 btn">Word Guess</button>
              <button onClick={this.props.closeModal} className="m-2 btn">Close</button>
              <div className="py-2">
                <i
                  onClick={this.props.toggleAutoInfo}
                  className={`fa text-${this.props.autoInfo ? 'primary fa-check' : 'danger fa-times'}`}
                >
                  {this.props.autoInfo ? ' Auto-Info Enabled' : ' Auto-Info Disabled'}
                </i>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={this.props.showModal}>
        <div className={this.props.showModal} onClick={this.props.closeModal} />
        <div className="card px-5 pt-5 text-center">
          <div className="card-body pb-1">
            <h4 className="card-title">{infoObjectValue.name}</h4>
            <img
              src={infoObjectValue.tutorial[infoIndex].animation}
              style={{width: '100%', maxWidth: '300px'}}
            />
            <p className="mt-2">
              {infoObjectValue.tutorial[infoIndex].text}
            </p>
            <button type="button" onClick={this.incrementInfoIndex} className="m-2 btn">Next</button>
            <button type="button" onClick={() => this.backToMain()} className="m-2 btn">Back</button>
            <div className="py-2">
              <i
                onClick={this.props.toggleAutoInfo}
                className={`fa text-${this.props.autoInfo ? 'primary fa-check' : 'danger fa-times'}`}
              >
                { this.props.autoInfo ? ' Auto-Info Enabled' : ' Auto-Info Disabled' }
              </i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoModal;