import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import GameBoard from './un_block_play'

import './un_block_create_style.css';

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

        
        this.createTallPiece = this.createTallPiece.bind(this);
        this.createLongPiece = this.createLongPiece.bind(this);
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
        } else if (thisPieceBottom > this.state.creationBoardWidth + this.state.creationBoardTop) {
            creationStack[ev.target.id].yPos = this.state.creationBoardBottom - pieceHeight;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceTop < this.state.creationBoardTop) {
            creationStack[ev.target.id].yPos = this.state.creationBoardTop;
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
        var pieceType = null;
        var pieceSize = document.getElementById("sizeDropDown").value;
        var newStack = this.state.creationStack;
        switch(document.getElementById("typeDropDown").value){
            case "Vertical":
                newStack.push({type: "unBlock_tallPiece", xPos: 0, yPos: this.state.creationBoardTop, height: this.state.creationBoardUnit*pieceSize, width: this.state.creationBoardUnit});
                break;
            case "Horizontal":
                newStack.push({type: "unBlock_longPiece", xPos: 0, yPos: this.state.creationBoardTop, height: this.state.creationBoardUnit, width: this.state.creationBoardUnit*pieceSize})
                break;
        }

        this.setState({
            creationStack: newStack
        });

    }

    createTallPiece() {
        const newStack = this.state.creationStack;
        newStack.push({type: "unBlock_tallPiece", xPos: 0, yPos: this.state.creationBoardTop, height: this.state.creationBoardUnit*2, width: this.state.creationBoardUnit})
        this.setState({
            creationStack: newStack
        });
    }

    createLongPiece() {
        const newStack = this.state.creationStack;
        newStack.push({type: "unBlock_longPiece", xPos: 0, yPos: this.state.creationBoardTop, height: this.state.creationBoardUnit, width: this.state.creationBoardUnit*2})
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
                        <div id={index} className={pieceType + ' gamePiece'} style={
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
                                    top: this.state.creationBoardUnit*2 + this.state.creationBoardTop,
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

                    <div className="form-group">
                        <label htmlFor="typeDropDown" className="dropDownLabel">Type:</label>
                        <select className="form-control mr-1" id="typeDropDown">
                            <option>Vertical</option>
                            <option>Horizontal</option>
                        </select>

                        <label htmlFor="sizeDropDown" className="dropDownLabel">Size:</label>
                        <select className="form-control" id="sizeDropDown">
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
                        <button className="btn-outline-primary create_piece_button ml-1" onClick={this.createPiece}>Create</button>
                        <button className="btn-outline-success unBlock_playButton float-right" onClick={this.instantiateGame}>Test Play</button>
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
                        <div className="form-group">
                            <button className="btn-outline-danger continue_edit_btn col-xs-6 col-sm-6" onClick={this.backToCreate}>Continue Editing</button>
                        </div>
                </div>
            )
        }
    }
}

