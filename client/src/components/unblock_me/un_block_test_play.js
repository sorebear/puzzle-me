import React, { Component } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import './un_block_style.css';
import Axios from 'axios';

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:4000'
Axios.defaults.withCredentials = true;
export default class extends Component {
    constructor(props){
        super(props);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
        this.handleEnd = this.handleEnd.bind(this);

        this.handleDragStartY = this.handleDragStartY.bind(this);
        this.handleDraggingY = this.handleDraggingY.bind(this);
        this.handleEndY = this.handleEndY.bind(this);

        this.URL_EXT = '/savepuzzle';

        this.state = {
            gameBoardWidth: 0,
            oneBoardUnit: 0,
            gameBoardTop: 0,
            gameBoardBottom: 0,

            piecePos: null,

            startPos: null,
            mouseStart: null,
            mouseCurrent: null,

            hasRendered: false,
            createdStack: props.pieceStack,
            pieceMap: createPieceMap(props),

            canMoveRight: true,
            canMoveLeft: true,
            canMoveUp: true,
            canMoveDown: true,
        };


//GETS CALLED FROM STATE TO CREATE PIECE MAP FROM PROPS OBJ
        function createPieceMap(props){
            var pieceMap = [];
            console.log("CREATED STACK", props.pieceStack)
            props.pieceStack.map((piece, index)=>{
                var yPos = piece.yPos;
                var xPos = piece.xPos;
                var type = piece.type;
                var pieceWidth = piece.width;
                var pieceHeight = piece.height;
                pieceMap.push({y: yPos, x: xPos, type: type, width: pieceWidth, height: pieceHeight})
            });
            return pieceMap;
        }
    }

    //WHEN THE COMPONENT MOUNTS, SET BOARD WIDTH & ADJUST PIECE MAP TO PROPER SCALE
    componentDidMount(){
        const gameBoardWidth = window.innerWidth;
        const gameBoardTop = 55;
        const gameBoardBottom = window.innerWidth + 55;
        const oneBoardUnit = window.innerWidth / 6;
        var correctedMap = [{y: 2*oneBoardUnit, x: 0*oneBoardUnit, type: "unBlock_starterPiece", width: 2, height: 1}];

        this.state.pieceMap.map((piece, index)=>{
            correctedMap.push({x: piece.x*oneBoardUnit, y: piece.y*oneBoardUnit + gameBoardTop, type: piece.type, width: piece.width*oneBoardUnit, height: piece.height*oneBoardUnit})
        });
        this.setState({
            gameBoardWidth: gameBoardWidth,
            oneBoardUnit: oneBoardUnit,
            pieceMap: correctedMap,
            gameBoardTop: gameBoardTop,
            gameBoardBottom: gameBoardBottom
        });
    }


    handleDragStart(ev){
        var startPosition = null;
        if(ev.type == 'touchstart') {
            startPosition = ev.touches[0].clientX;
        }else if(ev.type == 'mousedown'){
           startPosition = ev.clientX;
        }

        this.setState({
            startPos: startPosition,
            canMoveLeft: true,
            canMoveRight: true,
            canMoveUp: true,
            canMoveDown: true
        })
    }
    handleDragStartY(ev){
        var startPosition = null;

        if(ev.type == 'touchstart') {
            startPosition = ev.touches[0].clientY;
        }else if(ev.type == 'mousedown'){
            startPosition = ev.clientY;
        }

        this.setState({
            startPos: startPosition,
            canMoveLeft: true,
            canMoveRight: true,
            canMoveUp: true,
            canMoveDown: true
        })
    }
    handleDragging(ev) {
        //ev.preventDefault();
        const pieceWidth = parseInt(ev.target.style.width);
        const pieceHeight = parseInt(ev.target.style.height);
        const thisPieceLeft = parseInt(ev.target.style.left);
        const thisPieceRight = parseInt(ev.target.style.left) + pieceWidth;
        const thisPieceTop = parseInt(ev.target.style.top);
        const thisPieceBottom = parseInt(ev.target.style.top) + pieceHeight;

        var currentPosition = this.state.pieceMap[ev.target.id].x;
        var amountToMove = null;
        if(ev.type == 'touchmove') {
            amountToMove = ev.touches[0].clientX - this.state.startPos;
        }else if(ev.type == 'mousemove'){
            amountToMove = ev.clientX - this.state.startPos;
        }



        const {pieceMap} = this.state;

        if(ev.target.id == 0 && this.state.pieceMap[ev.target.id].x + this.state.oneBoardUnit*2 > this.state.gameBoardWidth - 1){

            var puzzName = prompt("Enter name");
            console.log(SERVER_BASE_ADDRESS + this.URL_EXT);
            Axios.post(SERVER_BASE_ADDRESS + this.URL_EXT, {
                puzzle_name : puzzName,
                type : "unblock_me",
                size : `6x6`,
                puzzle_object : this.state.createdStack,
            }).then(()=>{console.log("submitted")}).catch(err => {
                console.log("Error Loading Puzzle: ", err);
            });
        }

        //////
        if (amountToMove > 0 && amountToMove < this.state.oneBoardUnit*3) {
            this.setState({
                canMoveLeft: true,
            });
            this.state.pieceMap.map((piece, index) => {
                if (index == ev.target.id) {
                } else if (thisPieceTop + 1 < piece.y + piece.height*this.state.oneBoardUnit && thisPieceBottom - 1 > piece.y && thisPieceRight > piece.x - 1 && thisPieceLeft < piece.x) {
                    console.log("COLLY")
                    pieceMap[ev.target.id].x = piece.x - pieceWidth;
                    this.setState({
                        pieceMap: [...pieceMap],
                        canMoveRight: false,

                    })
                } else if (thisPieceRight > this.state.gameBoardWidth - 1 && this.state.canMoveRight === true) {
                    pieceMap[ev.target.id].x = this.state.gameBoardWidth - pieceWidth;
                    this.setState({
                        pieceMap: [...pieceMap],
                    })
                } else if (this.state.canMoveRight === true) {
                    pieceMap[ev.target.id].x = currentPosition + amountToMove;

                    var startingPosition = null;

                    if(ev.type == 'touchmove') {
                        startingPosition = ev.touches[0].clientX;
                    }else if(ev.type == 'mousemove'){
                        startingPosition= ev.clientX;
                    }
                    this.setState({
                        pieceMap: [...pieceMap],
                        startPos: startingPosition
                    });
                }
            })
        } else if (amountToMove < 0 && Math.abs(amountToMove) < this.state.oneBoardUnit*3) {
            this.setState({
                canMoveRight: true,
            });
            this.state.pieceMap.map((piece, index) => {
                if (index == ev.target.id) {

                } else if (thisPieceTop + 1 < piece.y + piece.height*this.state.oneBoardUnit && thisPieceBottom - 1 > piece.y && thisPieceLeft < piece.x + piece.width*this.state.oneBoardUnit + 1 && thisPieceRight > piece.x + piece.width*this.state.oneBoardUnit) {
                    pieceMap[ev.target.id].x = piece.x + piece.width*this.state.oneBoardUnit;
                    this.setState({
                        pieceMap: this.state.pieceMap,
                        canMoveLeft: false,
                    })
                } else if (thisPieceLeft < 1 && this.state.canMoveLeft === true) {
                    pieceMap[ev.target.id].x = 0;
                    this.setState({
                        pieceMap: [...pieceMap],
                    })
                } else if (this.state.canMoveLeft === true) {
                    pieceMap[ev.target.id].x = currentPosition + amountToMove;

                    var startingPosition = null;
                    if(ev.type == 'touchmove') {
                        startingPosition = ev.touches[0].clientX;
                    }else if(ev.type == 'mousemove'){
                        startingPosition= ev.clientX;
                    }
                    this.setState({
                        pieceMap: [...pieceMap],
                        startPos: startingPosition,
                    });

                }
            })
        }
    }

    /////////////////////////////
    handleDraggingY(ev){
        const pieceWidth = parseInt(ev.target.style.width);
        const pieceHeight = parseInt(ev.target.style.height);
        const thisPieceLeft = parseInt(ev.target.style.left);
        const thisPieceRight = parseInt(ev.target.style.left) + pieceWidth;
        const thisPieceTop = parseInt(ev.target.style.top);
        const thisPieceBottom = parseInt(ev.target.style.top) + pieceHeight;

        var currentPosition = this.state.pieceMap[ev.target.id].y;

        var amountToMove = null;
        if(ev.type == 'touchmove') {
            amountToMove = ev.touches[0].clientY - this.state.startPos;
        }else if(ev.type == 'mousemove'){
            amountToMove = ev.clientY - this.state.startPos;
        }

        const {pieceMap} = this.state;

        if(amountToMove > 0 && amountToMove < this.state.oneBoardUnit*2 && this.state.canMoveDown === true){
            this.setState({
                canMoveUp: true,
            });
            this.state.pieceMap.map((piece, index)=> {
                if(index == ev.target.id){
                }else if(thisPieceLeft < piece.x + piece.width*this.state.oneBoardUnit && thisPieceRight - 1 > piece.x && thisPieceBottom > piece.y - 1 && thisPieceTop < piece.y) {
                    pieceMap[ev.target.id].y = piece.y - pieceHeight;
                    this.setState({
                        pieceMap: [...pieceMap],
                        canMoveDown: false,
                    })
                } else if(thisPieceBottom > this.state.gameBoardWidth && this.state.canMoveDown === true){
                    pieceMap[ev.target.id].y = this.state.gameBoardBottom - pieceHeight - this.state.gameBoardTop;
                    this.setState({
                        pieceMap: [...pieceMap],
                        canMoveDown: false,
                    })
                } else if(this.state.canMoveDown === true){
                    pieceMap[ev.target.id].y = currentPosition + amountToMove;

                    var startingPosition = null;
                    if(ev.type == 'touchmove') {
                        startingPosition = ev.touches[0].clientY;
                    }else if(ev.type == 'mousemove'){
                        startingPosition= ev.clientY;
                    }
                    this.setState({
                        pieceMap: [...pieceMap],
                        startPos: startingPosition
                    });
                }
            })
        }else if(amountToMove < 0 && Math.abs(amountToMove) < this.state.oneBoardUnit*2 && this.state.canMoveUp === true){
            this.setState({
                canMoveDown: true,
            });
            this.state.pieceMap.map((piece, index)=> {
                if(index == ev.target.id){

                }else if (thisPieceLeft < piece.x + piece.width*this.state.oneBoardUnit && thisPieceRight - 1 > piece.x && thisPieceTop < piece.y + piece.height*this.state.oneBoardUnit + 1 && thisPieceBottom > piece.y) {
                    pieceMap[ev.target.id].y = piece.y + piece.height*this.state.oneBoardUnit;
                    this.setState({
                        pieceMap: [...pieceMap],
                        canMoveUp: false,
                    })
                } else if(thisPieceTop < 1  && this.state.canMoveUp === true){
                    pieceMap[ev.target.id].y = 0;
                    this.setState({
                        pieceMap: [...pieceMap],
                    })
                } else if(this.state.canMoveUp === true){

                    pieceMap[ev.target.id].y = currentPosition + amountToMove;

                    var startingPosition = null;
                    if(ev.type == 'touchmove') {
                        startingPosition = ev.touches[0].clientY;
                    }else if(ev.type == 'mousemove'){
                        startingPosition= ev.clientY;
                    }
                    this.setState({
                        pieceMap: [...pieceMap],
                        startPos: startingPosition
                    });
                }
            })
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////
    handleEnd(ev){

    }

    handleEndY(ev){

    }

///////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        const gameBoardWidth = window.innerWidth;
        const gameBoardTop = 55;
        const gameBoardBottom = window.innerWidth + 55;
        const oneBoardUnit = window.innerWidth / 6;

        var pieceArr = [];
        this.state.pieceMap.map((piece, index) => {
            const pieceType = piece.type;
            if (piece.type === "unBlock_tallPiece") {
                var yPos = this.state.pieceMap[index].y;
                var xPos = this.state.pieceMap[index].x;
                var height = this.state.pieceMap[index].height;
                var width = this.state.pieceMap[index].width;

                pieceArr.push(
                    <DraggableCore onStart={this.handleDragStartY}
                                   onDrag={this.handleDraggingY}
                                   onStop={this.handleEndY}
                    >
                        <div key={index} id={index} className={pieceType + ' gamePiece'} style={
                            {
                                width: width * oneBoardUnit,
                                height: height * oneBoardUnit,
                                top: yPos,
                                left: xPos,
                            }
                        }
                        >
                        </div>
                    </DraggableCore>
                )
            } else if (piece.type === "unBlock_longPiece") {
                var yPos = this.state.pieceMap[index].y;
                var xPos = this.state.pieceMap[index].x;
                var height = this.state.pieceMap[index].height;
                var width = this.state.pieceMap[index].width;

                pieceArr.push(
                    <DraggableCore
                        onStart={this.handleDragStart}
                        onDrag={this.handleDragging}
                        onStop={this.handleEnd}
                    >
                        <div key={index} id={index} className={pieceType + ' gamePiece'} style={
                            {
                                width: width * oneBoardUnit,
                                height: height * oneBoardUnit,
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

        return (
            <div className="gameBoardDiv">
                <DraggableCore
                    onStart={this.handleDragStart}
                    onDrag={this.handleDragging}
                    onStop={this.handleEnd}
                >
                    <div
                        id={0} className="starterPiece gamePiece" style={
                        {
                            top: this.state.pieceMap[0].y,
                            left: this.state.pieceMap[0].x,
                            width: this.state.pieceMap[0].width * oneBoardUnit,
                            height: this.state.pieceMap[0].height * oneBoardUnit,
                        }
                    }
                    >
                    </div>
                </DraggableCore>
                {pieceArr}
            </div>
        )
    }
}