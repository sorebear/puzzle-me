import homeMenu from './homeMenu.gif'
import ss_threeColors from './ss-threeColors.gif';
import ss_eachPerRowCol from './ss-eachPerRowCol.gif';
import ss_clueMatch from './ss-clueMatch.gif'
import ss_clueMatchFaster from './ss-clueMatchFaster.gif'
import ss_clickToChange from './ss-clickToChange.gif';
import um_howToWin from './um-howToWin.gif';
import um_moveBlocks from './um-moveBlocks.gif';
import um_horAndVert from './um-horAndVert.gif';
import wg_clueMeanings from './wg-clueMeanings.gif';
import wg_lengthMustMatch from './wg-lengthMustMatch.gif';
import wg_startingClues from './wg-startingClues.png';
import wg_winInFewestGuesses from './wg-winInFewestGuesses.gif';
import wg_hiddenWord from './wg-hiddenWord.gif';

const InfoObject = {
    home : {
        name: 'Welcome To PuzzleMe!',
        tutorial : [
            {
                animation : homeMenu,
                text: `You can explore PuzzleMe through the footer menu. Or learn to play our games by clicking a puzzle!`
            }
        ]
    },
    play_menu : {
        name: 'Play Menu',
        tutorial : [
            {
                animation : null,
                text: `Browse all created puzzles. When you find one that looks intriguing, click on it to play!`
            }
        ]
    },
    create_menu : {
        name: 'Create Menu',
        tutorial : [
            {
                animation : null,
                text: `Click on a puzzle style to start creating! Don't worry we'll have an info modal in each one to help guide you in your creation!`
            }
        ]
    },
    rankings : {
        name: 'Rankings',
        tutorial : [
            {
                animation : null,
                text: `Browse through the current rankings. You can click the table headers to adjust the sorting.`
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
        name: 'Play Speckle Spackle',
        tutorial : [
            {
                animation : ss_threeColors,
                text: `Each puzzle contains 3 different colors. White is considered "Blank"`
            },
            {
                animation : ss_eachPerRowCol,
                text: `Each row and column MUST contain EXACTLY ONE of every color. You cannot have duplicates in a row or column`
            },
            {
                animation : ss_clueMatchFaster,
                text: `The circles around the border must match in color with the first colored square they hit, coming from that direction. (Remember white is considered 'blank')`
            },
            {
                animation : ss_clickToChange,
                text: `Click on a square to rotate through possible color values`
            },
            {
                animation : null,
                text: `That's it. You should be all set to go. Happy Puzzling!`
            }
        ]
    },
    unblock_me_play : {
        name: 'Play Unblock Me',
        tutorial : [
            {
                animation : um_howToWin,
                text: `Your goal is to move the white block to the right edge of the map`
            },
            {
                animation : um_moveBlocks,
                text: `You may have blocks in your way that you'll need to move.`
            },
            {
                animation : um_horAndVert,
                text: `Some blocks will only move horizontally, while others will only move vertically.`
            },
            {
                animation : null,
                text: `That's it. You should be all set to go. Happy Puzzling!`
            }
        ]
    },
    word_guess_play : {
        name : 'Play Word Guess',
        tutorial : [
            {
                animation : wg_hiddenWord,
                text: `You are trying to guess a hidden word between 4 and 6 letters long.`
            },
            {
                animation : wg_lengthMustMatch,
                text: `Your guess length must match the word length specified.`
            },
            {
                animation : wg_clueMeanings,
                text: `You will get feedback on your guess. The first number is how many letters are correct. The second is how many are ALSO in the correct position.`
            },
            {
                animation : wg_startingClues,
                text: `Some games will have starting "Clues". These don't count towards your total guesses.`
            },
            {
                animation : wg_winInFewestGuesses,
                text : `Try to guess the hidden word in the fewest number of guesses`
            },
            {
                animation : null,
                text: `That's it. You should be all set to go. Happy Puzzling!`
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