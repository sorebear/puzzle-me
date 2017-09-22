import React from 'react';

const puzzle_data = [
    {
        name : 'The Puzzler',
        author : 'Sauron',
        type : 'Coloruko',
        size : '4x4',
        dateCreated : '09/15/17',
        ratingPos : 56,
        ratingNeg : 14,
        averageTime : 170
    },
    {
        name : 'The Stumper',
        author : 'Sha Sha Sha',
        type : 'Unblock Me',
        size : '5x5',
        dateCreated : '09/10/17',
        ratingPos : 76,
        ratingNeg : 10,
        averageTime : 90
    },
    {
        name : 'Pharoh\'s Tomb',
        author : 'Bludo',
        type : 'Word Guess',
        size : '5-Letter',
        dateCreated : '09/01/17',
        ratingPos : 6,
        ratingNeg : 20,
        averageTime : 240,
        gameInfo : {
            hiddenWord : 'BOOKS',
            startingWords : ['OLDEN', 'CLOCK']
        }
    },
    {
        name : 'Puzz Puzz',
        author : 'Bludo',
        type : 'Word Guess',
        size : '4-Letter',
        dateCreated : '08/11/17',
        ratingPos : 56,
        ratingNeg : 14,
        averageTime : 154,
        gameInfo : {
            hiddenWord : 'DOWN',
            startingWords : ['NERD', 'WINS']
        }
    }
]

export default puzzle_data;