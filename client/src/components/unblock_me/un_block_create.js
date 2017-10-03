import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import GameBoard from './un_block_test_play'
import './un_block_style.css';

export default class CreationStation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "create",

            creationBoardWidth: 0,
            creationBoardUnit: 0,
            creationBoardTop: 0,
            creationBoardBottom: 0,

            piecePos: null,

            startPosY: null,
            startPosX: null,
            mouseStart: null,
            mouseCurrent: null,

            canMoveDown: true,
            canMoveUp: true,
            canMoveRight: true,
            canMoveLeft: true,

            hasRendered: false,

            creationStack: [],
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragging = this.handleDragging.bind(this);

        this.instantiateGame = this.instantiateGame.bind(this);
        this.backToCreate = this.backToCreate.bind(this);
        this.createPiece = this.createPiece.bind(this);

    }
    componentDidMount(){
        const creationBoardWidth = document.getElementsByClassName("creationBoardDiv")[0].clientHeight;
        const creationBoardTop = document.getElementsByClassName("creationBoardDiv")[0].getBoundingClientRect().top;
        const creationBoardBottom = creationBoardTop + creationBoardWidth;
        const creationBoardUnit = document.getElementsByClassName("creationBoardDiv")[0].clientHeight/6;
        this.setState({
            creationBoardWidth: creationBoardWidth,
            creationBoardUnit: creationBoardUnit,
            creationBoardTop: creationBoardTop,
            creationBoardBottom: creationBoardBottom
        })
    }

    handleDragStart(ev){
        this.setState({
            startPosY: ev.touches[0].clientY,
            startPosX: ev.touches[0].clientX,
        })
    }

    handleDragging(ev) {
        const pieceWidth = this.state.creationStack[ev.target.id].width;
        const pieceHeight = this.state.creationStack[ev.target.id].height;
        const thisPieceLeft = this.state.creationStack[ev.target.id].xPos;
        const thisPieceRight = this.state.creationStack[ev.target.id].xPos + pieceWidth;
        const thisPieceTop = this.state.creationStack[ev.target.id].yPos;
        const thisPieceBottom = this.state.creationStack[ev.target.id].yPos + pieceHeight;

        var currentPositionX = this.state.creationStack[ev.target.id].xPos;
        var currentPositionY = this.state.creationStack[ev.target.id].yPos;

        var moveX = ev.touches[0].clientX - this.state.startPosX;
        var moveY = ev.touches[0].clientY - this.state.startPosY;

        const {creationStack} = this.state;

        if (thisPieceRight > this.state.creationBoardWidth && this.state.canMoveRight === true) {
            creationStack[ev.target.id].xPos = this.state.creationBoardWidth - pieceWidth;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceLeft < 0) {
            creationStack[ev.target.id].xPos = 0;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceBottom > this.state.creationBoardWidth) {
            creationStack[ev.target.id].yPos = this.state.creationBoardWidth - pieceHeight;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceTop < 0) {
            creationStack[ev.target.id].yPos = 0;
            this.setState({
                creationStack: [...creationStack],
            })
        } else {
            if(moveX > 0){
                this.setState({
                    canMoveLeft: true,
                })
            }
            creationStack[ev.target.id].xPos = currentPositionX + moveX;
            creationStack[ev.target.id].yPos = currentPositionY + moveY;
            this.setState({
                creationStack: [...creationStack],
                startPosX: ev.touches[0].clientX,
                startPosY: ev.touches[0].clientY
            });
        }
    }

    createPiece(ev){
        var pieceSize = document.getElementById("sizeDropDown").value;
        var newStack = this.state.creationStack;
        switch(document.getElementById("typeDropDown").value){
            case "Vertical":
                newStack.push({type: "unBlock_tallPiece", xPos: 0, yPos: 0, height: this.state.creationBoardUnit*pieceSize, width: this.state.creationBoardUnit});
                break;
            case "Horizontal":
                newStack.push({type: "unBlock_longPiece", xPos: 0, yPos: 0, height: this.state.creationBoardUnit, width: this.state.creationBoardUnit*pieceSize})
                break;
        }
        this.setState({
            creationStack: newStack
        });
    }

    instantiateGame(ev) {

        this.setState({
            mode: "play",
        })
    }
    backToCreate(){
        this.setState({
            mode: "create"
        })
    }

    render() {

        var pieceArr = [];
        this.state.creationStack.map((piece, index) => {
            const pieceType = piece.type;
            if (pieceType === "unBlock_tallPiece") {
                var yPos = this.state.creationStack[index].yPos;
                var xPos = this.state.creationStack[index].xPos;
                var width = this.state.creationStack[index].width;
                var height = this.state.creationStack[index].height;

                pieceArr.push(
                    <DraggableCore onStart={this.handleDragStart}
                                   onDrag={this.handleDragging}
                                   onStop={this.handleEnd}
                    >
                        <div key={index} id={index} className={pieceType + ' gamePiece'} style={
                            {
                                width: width,
                                height: height,
                                top: yPos,
                                left: xPos,
                            }
                        }
                        >
                        </div>
                    </DraggableCore>
                )
            } else if (piece.type === "unBlock_longPiece") {
                var yPos = this.state.creationStack[index].yPos;
                var xPos = this.state.creationStack[index].xPos;
                var width = this.state.creationStack[index].width;
                var height = this.state.creationStack[index].height;

                pieceArr.push(
                    <DraggableCore
                        onStart={this.handleDragStart}
                        onDrag={this.handleDragging}
                        onStop={this.handleEnd}
                    >
                        <div id={index} className={pieceType + ' gamePiece'} style={
                            {
                                width: width,
                                height: height,
                                top: yPos,
                                left: xPos,
                                resize: "both",
                            }
                        }
                        >
                        </div>
                    </DraggableCore>
                )
            }
        });



        if (this.state.mode === "create"){
            return(

                <div className="container gameArea">
                    <div className="creationBoardDiv">
                        <DraggableCore

                        >
                            <div
                                className="starterPiece gamePiece" style={
                                {
                                    top: this.state.creationBoardUnit*2 ,
                                    left: 0,
                                    width: this.state.creationBoardUnit*2,
                                    height: this.state.creationBoardUnit,
                                }
                            }
                            >
                            </div>
                        </DraggableCore>
                        {pieceArr}
                    </div>

                    <div className="form-group-block justify-content-around align-items-center d-flex pt-4 pb-4" >
                        <label htmlFor="typeDropDown" className="dropDownLabel m-0">Type:</label>
                        <select className="form-control-unblock" id="typeDropDown">
                            <option>Vertical</option>
                            <option>Horizontal</option>
                        </select>

                        <label htmlFor="sizeDropDown" className="dropDownLabel m-0">Size:</label>
                        <select className="form-control-unblock" id="sizeDropDown">
                            <option>1.0</option>
                            <option>1.5</option>
                            <option>2.0</option>
                            <option>2.5</option>
                            <option>3.0</option>
                            <option>3.5</option>
                            <option>4.0</option>
                            <option>4.5</option>
                            <option>5.0</option>
                            <option>5.5</option>
                        </select>
                        <button className="btn btn-outline-danger create_piece_button" onClick={this.createPiece}>Create</button>
                    </div>
                    <div className="justify-content-center d-flex">
                        <button className="btn btn-outline-primary" style={{position: "fixed", bottom: "50px"}} onClick={this.instantiateGame}>Test Play</button>
                    </div>
                </div>
            )
        } else if(this.state.mode === "play") {
            var playableStack = [];
            this.state.creationStack.map((piece, index)=>{
                playableStack.push({type: piece.type, xPos: piece.xPos/this.state.creationBoardUnit, yPos: (piece.yPos-this.state.creationBoardTop)/this.state.creationBoardUnit, height: piece.height/this.state.creationBoardUnit, width: piece.width/this.state.creationBoardUnit})
            })
            return (
                <div className="container gameArea">
                    <GameBoard pieceStack={playableStack}/>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-danger" style={{position:"fixed", bottom:"50px"}} onClick={this.backToCreate}>Continue Editing</button>
                    </div>
                </div>
            )
        }
    }
}

