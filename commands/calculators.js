const responses = require('./../responses.json');

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
    getLabor: function(value){
        if (!checkNum(value)) return responses.invalidLabor;
        var amount = parseInt(value, 10);
        var breakeven = Math.ceil(((amount * 15) / (72 * 28)));
        return (responses.labor.replace("{0}", breakeven));
    },
    getRum: function(swill, grog, rum){ // Is something wrong?
        if (!checkNum(swill) || !checkNum(grog) || !checkNum(rum)) {
            return responses.rumfail;
        }
        var swillVal = parseInt(swill, 10) * 15;
        var grogVal = parseInt(grog, 10) * 10;
        var rumVal = parseInt(rum, 10) * 6;
        var cheapest = (rumVal < grogVal && rumVal < swillVal) ? "Rum" : (grogVal < swillVal) ? "Grog" : "Swill";
        return responses.rum.replace("{0}", swillVal).replace("{1}", grogVal).replace("{2}", rumVal).replace("{3}", cheapest);
    }
}
