import React, {Component} from 'react';
import ColorPicker from './color_picker';

class SudoSudokuApp extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-xs-1">
                    <ColorPicker/>
                    <ColorPicker/>
                    <ColorPicker/>
                </div>
                <div className="col-xs-10"></div>
                <div className="col-xs-1"></div>
            </div>
        )
    }
}

export default SudoSudokuApp;