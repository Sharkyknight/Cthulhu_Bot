/** 
 * Imitates YPP Black Box (series vi).
 * select a random prize from the list. Values are the RNG chance of obtaining any given prize.
 */

const prizes = require('./prizes.json');

const prizelist = ["trinket", "fox", "expedition", "charm", "amulet", "compass", "smh", "piggy", "smuggler",
    "vampire", "wax", "tophat", "bandana", "dread", "emptypiggy", "design", "pet", "chroma", "parrot"];
const values = [5199, 5201, 6800, 7900, 8400, 8750, 9050, 9230, 9410, 9530, 9630, 9705, 9780, 9830, 9850, 9917, 9983, 9998, 10000];

if (Object.keys(prizes).length != values.length) throw Error('All prizes require a value. ' + Object.keys(prizes).length + ", " + values.length);

function getRNG (val){
    var rng = Math.floor(Math.random()*val);
    return rng;
}

module.exports = {
    useBox: function (){
        var result = 0;         // base case
        var rng = getRNG(values[values.length-1]);  // last value in array
        for (i=1; i<values.length; i++){            // get the prize type
            if (values[i-1] < rng  && rng < values[i]){
                result = i;
                break;
            }
        }
        var options = prizes[prizelist[result]];
        rng = getRNG(options.length);
        return options[rng];
    }
}