/** 
 * Collection of ways to complement the given user.
 */

const responses = require('./../responses.json');
const dialogues = require('./dialogues.json');

/**
* Parameters
*   obj: JSON object where all values are strings
*   name: the name of the person to be inserted into the dialogue
* Return
*   Randomly selected value within obj, where all {0}s are replaced with name
*/
function randomDialogue(obj, name){
    if (typeof name === "undefined" || typeof obj === "undefined" || !obj || obj == "null" || obj === "undefined") {    // Parameters incorrect
        return(responses.error);
    }
    else {
        var num = Object.keys(obj).length;                  // Total num of dialogues available
        var rng = Math.floor(Math.random()*num);
        var dialog = obj[rng];
        while (dialog.includes("{0}")){                     // insert name into poem
            dialog = dialog.replace("{0}", name);
        }
        return dialog;
    }
}

/**
* Pls forgive me this is hacky
* Parameters
*   name: string of name for person to appreciate
* Return
*   String of appreciates
*/
function tripleAppreciate(name){
    var responseA = randomDialogue(dialogues.appreciate, name);
    var responseB = randomDialogue(dialogues.appreciate, name);
    var responseC = randomDialogue(dialogues.appreciate, name);
    while (responseA === responseB || responseB == responseC || responseA == responseC){
        responseA = randomDialogue(dialogues.appreciate, name);
        responseB = randomDialogue(dialogues.appreciate, name);
        responseC = randomDialogue(dialogues.appreciate, name);
    }
    return (responseA + " " + responseB + " " + responseC);
}

module.exports = {
    getDialogue: function (type, name){
        var response = responses.error;
        if (typeof name !== "undefined"){
            response = (type === "appreciate") ? tripleAppreciate(name) : randomDialogue(dialogues[type], name);
        }
        return response;
    },
    goodnight: function (name){
        return(responses.night.replace("{0}", name));
    }
}