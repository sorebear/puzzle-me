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
            numbers: 1,

            creationStack: [],
        };
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragging = this.handleDragging.bind(this);

        this.instantiateGame = this.instantiateGame.bind(this);
        this.backToCreate = this.backToCreate.bind(this);
        this.createPiece = this.createPiece.bind(this);

       // this.updateDimensions = this.updateDimensions.bind(this);

    }
    componentDidMount(){
        // window.addEventListener("resize", this.updateDimensions);
        this.props.updateCurrentPath("unblock_me_create", '', 'create', [this.instantiateGame, this.backToCreate])


        // this.setState({
        //     creationBoardWidth: window.innerWidth
        // })

        // const creationBoardWidth = document.getElementsByClassName("creationBoardDiv")[0].clientHeight;
        // const creationBoardTop = document.getElementsByClassName("creationBoardDiv")[0].getBoundingClientRect().top;
        // const creationBoardBottom = creationBoardTop + creationBoardWidth;
        // const creationBoardUnit = document.getElementsByClassName("creationBoardDiv")[0].clientHeight/6;
        // this.setState({
        //     creationBoardWidth: creationBoardWidth,
        //     creationBoardUnit: creationBoardUnit,
        //     creationBoardTop: creationBoardTop,
        //     creationBoardBottom: creationBoardBottom
        // })
    }
    // updateDimensions() {
    //     var adjustmentRatio = window.innerWidth/this.state.creationBoardWidth;
    //
    //     var updatedPieceMap = [];
    //     this.state.creationStack.map((piece, index)=>{
    //         console.log(piece)
    //         updatedPieceMap.push({xPos: piece.xPos*adjustmentRatio, yPos: piece.yPos*adjustmentRatio, type: piece.type, width: piece.width, height: piece.height})
    //     });
    //
    //     this.setState({
    //         createdStack: updatedPieceMap,
    //         creationBoardWidth: window.innerWidth
    //     });
    //     console.log("STACK", this.state.createdStack)
    //
    // }
    handleDragStart(ev){
        if(ev.type == 'touchstart') {
            this.setState({
                startPosY: ev.touches[0].clientY,
                startPosX: ev.touches[0].clientX,
            })
        }else if(ev.type == 'mousedown'){
            this.setState({
                startPosY: ev.clientY,
                startPosX: ev.clientX
            })
        }
    }

    handleDragging(ev) {

        const pieceWidth = parseInt(ev.target.style.width);
        const pieceHeight = parseInt(ev.target.style.height);
        const thisPieceLeft = parseInt(ev.target.style.left);
        const thisPieceRight = pieceWidth + parseInt(ev.target.style.left);
        const thisPieceTop = parseInt(ev.target.style.top);
        const thisPieceBottom = (parseInt(ev.target.style.top) + pieceHeight);

        const boardWidth = window.innerWidth;
        const boardUnit = boardWidth/6;
        const boardBottom = boardWidth + 55;
        const boardTop = 55;

        var currentPositionX = this.state.creationStack[ev.target.id].xPos;
        var currentPositionY = this.state.creationStack[ev.target.id].yPos;
        var moveX = null;
        var moveY = null;


        if(ev.type == 'touchmove') {
             moveX = ev.touches[0].clientX - this.state.startPosX;
             moveY = ev.touches[0].clientY - this.state.startPosY;
        } else if (ev.type == 'mousemove'){
             moveX = ev.clientX - this.state.startPosX;
             moveY = ev.clientY - this.state.startPosY;
        }

        const {creationStack} = this.state;

        if (thisPieceRight > boardWidth && this.state.canMoveRight === true) {
            creationStack[ev.target.id].xPos = boardWidth - pieceWidth;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceLeft < 0) {
            creationStack[ev.target.id].xPos = 0;
            this.setState({
                creationStack: [...creationStack],
            })
        } else if (thisPieceBottom > boardWidth) {
            creationStack[ev.target.id].yPos = boardWidth - pieceHeight;
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


            if(ev.type == 'touchmove') {
                this.setState({
                    creationStack: [...creationStack],
                    startPosX: ev.touches[0].clientX,
                    startPosY: ev.touches[0].clientY
                });
            } else if (ev.type == 'mousemove'){
                this.setState({
                    creationStack: [...creationStack],
                    startPosX: ev.clientX,
                    startPosY: ev.clientY
                });
            }
        }
    }

    createPiece(ev){
        var pieceSize = document.getElementById("sizeDropDown").value;
        var newStack = this.state.creationStack;
        switch(document.getElementById("typeDropDown").value){
            case "Vertical":
                newStack.push({type: "unBlock_tallPiece", xPos: 0, yPos: 0, height: pieceSize, width: 1});
                break;
            case "Horizontal":
                newStack.push({type: "unBlock_longPiece", xPos: 0, yPos: 0, height: 1, width: pieceSize})
                break;
        }
        this.setState({
            creationStack: newStack
        });
    }

    instantiateGame(ev) {
        this.props.updateCurrentPath("word_guess_create", '', 'testplay', [this.instantiateGame, this.backToCreate]);
        this.setState({
            mode: "play",
        })
    }
    backToCreate(){
        this.props.updateCurrentPath("word_guess_create", '', 'create', [this.instantiateGame, this.backToCreate]);
        this.setState({
            mode: "create"
        })
    }

    render() {

        var boardWidth = window.innerWidth;
        var boardUnit = boardWidth / 6;

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
                                width: boardUnit*width,
                                height: boardUnit*height,
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
                                width: boardUnit*width,
                                height: boardUnit*height,
                                top: yPos,
                                left: xPos,
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

                <div className="container gameArea" style={{width: boardWidth}}>
                    <div className="creationBoardDiv">
                        <DraggableCore

                        >
                            <div
                                className="starterPiece gamePiece" style={
                                {
                                    top: boardUnit*2 ,
                                    left: 0,
                                    width: boardUnit*2,
                                    height: boardUnit,
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

                </div>
            )
        } else if(this.state.mode === "play") {
            var playableStack = [];
            this.state.creationStack.map((piece, index)=>{
                playableStack.push({type: piece.type, xPos: piece.xPos/boardUnit, yPos: (piece.yPos-55)/boardUnit, height: piece.height/boardUnit, width: piece.width/boardUnit})
            })
            return (
                <div className="container gameArea">
                    <GameBoard pieceStack={playableStack}/>
                </div>
            )
        }
    }
}