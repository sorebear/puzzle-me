import ss_threeColors from './ss-threeColors.gif';
import ss_eachPerRowCol from './ss-eachPerRowCol.gif';
import ss_clickToChange from './ss-clickToChange.gif';

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
        name: 'Home',
        tutorial : [
            {
                animation : null,
                text: `Welcome To Play Menu`
            }
        ]
    },
    create_menu : {
        name: 'Create Menu'
    },
    rankings : {
        name: 'Rankings'
    },
    profile: {
        name: 'Profile'
    },
    speckle_spackle_play : {
        name: 'Playing Speckle Spackle',
        tutorial : [
            {
                animation : {ss_threeColors},
                text: `Each puzzle contains 3 different colors. White is considered "Blank"`
            },
            {
                animation : {ss_eachPerRowCol},
                text: `Each row and column MUST contain ONE of every color`
            },
            {
                animation : {ss_clickToChange},
                text: `Click on a square to rotate through possible color values`
            }
        ]
    },
    unblock_me_play : {
        name: 'Playing Unblock Me'
    },
    word_guess_play : {
        name : 'Playing Word Guess',
        tutorial : [
            null
        ]
    },
    speckle_spackle_create : {
        name : 'Creating Speckle Spackle',
    },
    word_guess_create : {
        name: 'Creating Word Guess'
    },
    unblock_me_create : {
        name: 'Creating Unblock Me'
    }
}
export default InfoObject;