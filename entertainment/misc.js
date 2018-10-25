const responses = require('./../responses.json');
const dialogues = require('./dialogues.json');
const letters = require('./letters.json');

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

/**
* Parameters
*   next: letters[char]
*   arr: 
* Return
*   
*/
function addLetter(next, background, icon, arr){
    for (var i=0; i<7; i++){
        for (var j=0; j<next["1"].length; j++){
            if (i == 0 || i == 6){ arr[i].push(background); }
            else { arr[i].push(next[(i).toString()][j] == 0 ? background : icon); }
        }
    }
    for (var i=0; i<arr.length; i++){
        arr[i].push(" " + background);
    }
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
    flipCoin: function (isCarso, num){
        var count = parseInt(num);
        if (!checkNum(num) || count < 1){ count = 1; }
        if (isCarso && count == 3){   // Sorry Sharky :x
            var temp = Math.floor(Math.random() * 3);
            if (temp == 0) return ("(Heads: 2, Tails: 1) Heads,Heads,Tails");
            else if (temp == 1) return ("(Heads: 2, Tails: 1) Tails,Heads,Heads");
            else if (temp == 2) return ("(Heads: 2, Tails: 1) Heads,Tails,Heads");
        }
        var flips = new Array(count);
        var heads = 0;
        var tails = 0;
        for (var i=0; i<count; i++){
            var coin = Math.floor(Math.random() * 2);
            flips[i] = ((coin == 1) ? "Heads" : "Tails");
            if (coin == 1){ heads++; }
            else { tails++; }
        }
        var response = "(Heads: " + heads + ", Tails: " + tails + ") " + flips.toString();
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
    },
    emotiwords: function (words, background, icon){
        var n = 7;
        var next;
        var emoti = new Array();
        for (var i=0; i<n; i++){ emoti.push(new Array()); }
        for (var i=0; i<n; i++){ emoti[i].push(background); }
        // for each letter in words, replace with background (0) or icon (1)
        for (var i=0; i<words.length; i++){
            next = letters[words.charAt(i).toString()];
            addLetter(next, background, icon, emoti)
        }
        // New line between rows
        for (var i=0; i<7; i++){ emoti[i].push("\n"); }
        // Separate into lines without the separators
        var str = "";
        for (var i=0; i<7; i++){ str = str + emoti[i].join(""); }
        return str;
    }
}