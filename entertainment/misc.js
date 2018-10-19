const responses = require('./../responses.json');
const dialogues = require('./dialogues.json');

/**
* Parameters
*   str: string to be checked
* Return
*   true if the value is an integer > 0, false otherwise
*/
function checkNum(str){
    var num = parseInt(str, 10);
    return (!isNaN(num) && !(num < 1));
}

module.exports = {
    endLife: function (mins, death){
        var minutes = parseInt(mins);
        if (!checkNum(mins) || minutes < 1 || (death != "quick" && death != "slow")){
            return responses.endlifefail;
        }
        var deathtype = (death === "quick") ? "quick and painless" : "slow and painful";
        var response = (responses.endlife.replace("{0}", minutes).replace("{1}", deathtype));
        return response;
    },
    cthulhu: function (isAdmin, commands){
        if (!isAdmin) return responses.rejected;
        var response = "Ehh..";
        for (var i=0; i<commands.length; i++){
            var temp = commands[i].toLowerCase();
            if (temp.includes("jojo") || temp.includes("sharky") || temp.includes("carso") || temp == "me" || temp == "too") {
                response = "Of course!";
                break;
            }
        }
        return response;
    }
}