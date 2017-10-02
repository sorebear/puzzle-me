import ss_threeColors from './ss-threeColors.gif';
import ss_eachPerRowCol from './ss-eachPerRowCol.gif';
import ss_clickToChange from './ss-clickToChange.gif';
import wg_clueMeanings from './wg-clueMeanings.gif';
import wg_lengthMustMatch from './wg-lengthMustMatch.gif';
import wg_startingClues from './wg-startingClues.png';
import wg_winInFewestGuesses from './wg-winInFewestGuesses.gif';

const InfoObject = {
    home : {
        name: 'Home',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    play_menu : {
        name: 'Play Menu',
        tutorial : [
            {
                animation : null,
                text: `Welcome To Play Menu`
            }
        ]
    },
    create_menu : {
        name: 'Create Menu',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    rankings : {
        name: 'Rankings',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    profile: {
        name: 'Profile',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    speckle_spackle_play : {
        name: 'Learn Speckle Spackle',
        tutorial : [
            {
                animation : ss_threeColors,
                text: `Each puzzle contains 3 different colors. White is considered "Blank"`
            },
            {
                animation : ss_eachPerRowCol,
                text: `Each row and column MUST contain ONE of every color`
            },
            {
                animation : ss_clickToChange,
                text: `Click on a square to rotate through possible color values`
            }
        ]
    },
    unblock_me_play : {
        name: 'Playing Unblock Me',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    word_guess_play : {
        name : 'Playing Word Guess',
        tutorial : [
            {
                animation : wg_lengthMustMatch,
                text: `Your guess must match the word length specified.`
            },
            {
                animation : wg_clueMeanings,
                text: `The first number is how many letters are correct. The second is how many are ALSO in the correct position.`
            },
            {
                animation : wg_startingClues,
                text: `Some games will have starting "Clues". These don't count towards your total guesses.`
            },
            {
                animation : wg_winInFewestGuesses,
                text : `Try to guess the hidden word in the fewest number of guesses`
            }
        ]
    },
    speckle_spackle_create : {
        name : 'Creating Speckle Spackle',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    word_guess_create : {
        name: 'Creating Word Guess',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    },
    unblock_me_create : {
        name: 'Creating Unblock Me',
        tutorial : [
            {
                animation : null,
                text: `Welcome To PuzzleMe`
            }
        ]
    }
}
export default InfoObject;