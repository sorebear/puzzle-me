import homeMenu from './homeMenu.gif'
import ss_threeColors from './ss-threeColors.gif';
import ss_eachPerRowCol from './ss-eachPerRowCol.gif';
import ss_clueMatch from './ss-clueMatch.gif'
import ss_clueMatchFaster from './ss-clueMatchFaster.gif'
import ss_clickToChange from './ss-clickToChange.gif';
import ss_addColors from './ss-addColors.gif';
import ss_changeColors from './ss-changeColors.gif';
import ss_changeGridSize from './ss-changeGridSize.gif';
import ss_removeClues from './ss-removeClues.gif';
import ss_testplay from './ss-testplay.gif';
import wg_clueMeanings from './wg-clueMeanings.gif';
import wg_lengthMustMatch from './wg-lengthMustMatch.gif';
import wg_startingClues from './wg-startingClues.png';
import wg_winInFewestGuesses from './wg-winInFewestGuesses.gif';
import wg_hiddenWord from './wg-hiddenWord.gif';
import wg_pickSecretWord from './wg_pickSecretWord.gif';
import wg_addStartWords from './wg_addStartWords.gif';

const InfoObject = {
    init : {
        name: null,
        tutorial : [
            {
                animation: null,
                text: null
            }
        ]
    },
    home : {
        name: 'Welcome To PuzzleMe!',
        tutorial : [
            {
                animation : homeMenu,
                text: `You can explore PuzzleMe through the footer menu. Or learn to play our games by clicking a puzzle!`
            }
        ]
    },
    login : {
        name: 'Login',
        tutorial : [
            {
                animation : null,
                text: `Please sign in with Facebook to enjoy PuzzleMe`
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
                text: `Welcome to the rankings page. See how you stack up with the competition. You can click on a user to view their profile.`
            }
        ]
    },
    profile: {
        name: 'Profile',
        tutorial : [
            {
                animation : null,
                text: `Welcome to the profile page. If you're on your own profile page, you click to update your avatar and/or username.`
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
                animation : ss_addColors,
                text: `Click a color swatch to select and then place that color. Notice the clues will update automatically.`
            },
            {
                animation : ss_changeColors,
                text: `You can change a color by clicking on the refresh arrows`
            },
            {
                animation : ss_changeGridSize,
                text: `You can change the grid size you're building. Be aware that this will clear everything.`
            },
            {
                animation : ss_removeClues,
                text: `Click on clues to remove or add them.`
            },
            {
                animation : ss_testplay,
                text: `You must have a valid puzzle before you can test play or submit it.`
            },
            {
                animation : null,
                text: `That's it! You are all set to make your first Speckle Spackle Puzzle!`
            }
        ]
    },
    word_guess_create : {
        name: 'Creating Word Guess',
        tutorial : [
            {
                animation : wg_pickSecretWord,
                text: `Pick a hidden word between 4-6 letters. This is what solvers will be trying to guess`
            },
            {
                animation : wg_addStartWords,
                text: `Provide some initial clues to get your solver's started. We recommend giving 2 or 3.`
            },
            {
                animation : wg_clueMeanings,
                text: `You will get feedback for your clue. The first number is how many letters are correct. The second is how many are ALSO in the correct position.`
            },
            {
                animation: null,
                text: `That's it! You are all set to make your first Word Guess Puzzle!`
            }
        ]
    }
}
export default InfoObject;