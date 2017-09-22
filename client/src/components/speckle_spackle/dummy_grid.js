import React from 'react';

const gameInfo = {
    color0 : [255, 255, 255],
    color1 : [132, 0, 0],
    color2 : [0, 105, 113],
    color3 : [130, 137, 72],
    currentlySelected : "color1",
    numOfColors : 3,
    gridSize : 4,
    gameGrid : [
    {index: 0, name: "corner", className: "row0 column0", colorNum: "color0"},
    {index: 1, name: "clue", className: "row0 column1", colorNum: "color0"},
    {index: 2, name: "clue", className: "row0 column2", colorNum: "color2"},
    {index: 3, name: "clue", className: "row0 column3", colorNum: "color0"},
    {index: 4, name: "clue", className: "row0 column4", colorNum: "color0"},
    {index: 5, name: "corner", className: "row0 column5", colorNum: "color0"},

    {index: 6, name: "clue", className: "row1 column0", colorNum: "color0"},
    {index: 7, name: "square", className: "row1 column1", colorNum: "color1"},
    {index: 8, name: "square", className: "row1 column2", colorNum: "color2"},
    {index: 9, name: "square", className: "row1 column3", colorNum: "color0"},
    {index: 10, name: "square", className: "row1 column4", colorNum: "color3"},
    {index: 11, name: "clue", className: "row1 column5", colorNum: "color0"},

    {index: 12, name: "clue", className: "row2 column0", colorNum: "color1"},
    {index: 13, name: "square", className: "row2 column1", colorNum: "color0"},
    {index: 14, name: "square", className: "row2 column2", colorNum: "color1"},
    {index: 15, name: "square", className: "row2 column3", colorNum: "color3"},
    {index: 16, name: "square", className: "row2 column4", colorNum: "color2"},
    {index: 17, name: "clue", className: "row2 column5", colorNum: "color2"},

    {index: 18, name: "clue", className: "row3 column0", colorNum: "color3"},
    {index: 19, name: "square", className: "row3 column1", colorNum: "color2"},
    {index: 20, name: "square", className: "row3 column2", colorNum: "color3"},
    {index: 21, name: "square", className: "row3 column3", colorNum: "color1"},
    {index: 22, name: "square", className: "row3 column4", colorNum: "color0"},
    {index: 23, name: "clue", className: "row3 column5", colorNum: "color0"},

    {index: 24, name: "clue", className: "row4 column0", colorNum: "color0"},
    {index: 25, name: "square", className: "row4 column1", colorNum: "color3"},
    {index: 26, name: "square", className: "row4 column2", colorNum: "color0"},
    {index: 27, name: "square", className: "row4 column3", colorNum: "color2"},
    {index: 28, name: "square", className: "row4 column4", colorNum: "color1"},
    {index: 29, name: "clue", className: "row4 column5", colorNum: "color0"},

    {index: 30, name: "corner", className: "row0 column0", colorNum: "color0"},
    {index: 31, name: "clue", className: "row0 column1", colorNum: "color0"},
    {index: 32, name: "clue", className: "row0 column2", colorNum: "color0"},
    {index: 33, name: "clue", className: "row0 column3", colorNum: "color2"},
    {index: 34, name: "clue", className: "row0 column4", colorNum: "color0"},
    {index: 35, name: "corner", className: "row0 column5", colorNum: "color0"},
    ]
}

export default gameInfo