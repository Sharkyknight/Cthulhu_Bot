const responses = require('./../responses.json');
const moment = require('./../node_modules/moment/moment.js');
//const tz = require('./../node_modules/moment-timezone/moment-timezone.js');

/**
 * Returns a moment object sec to YPP current time
 */
function getMoment(){
    return moment(new Date());
}

/**
* Return
*   Returns a Date object set to YPP current time
*/
function getClock(){
    var clock = new Date();
    if (clock.getHours < 7){            // Remove 8 hours from current time
        var timern = clock.getHours();
        var temp = clock.getDate()-1;
        clock.setDate(temp);
        temp = clock.getHours()+(17+timern);
        clock.setHours(temp);
    }
    else {
        var temp = clock.getHours() - 7;
        clock.setHours(temp);
    }
    return clock;
}

/**
* Parameters
*   d1: Start date
*   d2: End date
* Return
*   Number of weeks between start and end date
*/
function weeksBetween(d1, d2) {
    return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

module.exports = {
    getMoment: function(zone){
        //return getMoment().tz(zone).toString();
        return getMoment();
    },
    getSMH: function(){
        var numWeeks = weeksBetween(new Date("6/2/2018"), getClock());
        var rmndr = numWeeks % 4;
        var msg = (rmndr == 0) ? responses.CI : (rmndr == 1) ? responses.HS : (rmndr == 2) ? responses.KH : responses.AT;
        return msg;
    },
    getTime: function(){
        var clock = getClock();
        var msg = responses.clock.replace("{0}", clock.toString());
        msg = msg.slice(0, 36);
        return (msg + " Game Time");
    },
    freePuzzles: function (){
        var date = getClock();
        var day = date.getDay();
        switch (day){
            case (0): // Sunday
                return (responses.blacksmith + "\n" + responses.drinkpoker);
            case (1):    // Monday
                return (responses.weave + "\n" + responses.sfrumspades);
            case (2):    // Tuesday
                return (responses.forage + "\n" + responses.tdhearts);
            case (3):    // Wednesday
                return (responses.alchem + "\n" + responses.drinkhearts);
            case (4):    // Thursday
                return (responses.nolabor + "\n" + responses.sfrumspades);
            case (5):    // Friday
                return (responses.distill + "\n" + responses.tdpoker);
            case (6):  // Saturday
                return (responses.swipwright + "\n" + responses.sfrum);
        }
    },
    reboot: function (){
        var cDate = getClock(); // Current Date
        var rDate = getClock(); // Next Reboot Date
        /* Set to next Reboot date & time */
        if (rDate.getMinutes() > 0){          // Reboot happens on the hour
            rDate.setMinutes(0);
            rDate.setHours(rDate.getHours()+1);
        }
        if (rDate.getHours() < 4){            //Reboot happens at 4am
            rDate.setHours(4);
        }
        else{                               // After 4am need to increase the date
            rDate.setHours(4);
            rDate.setDate(rDate.getDate()+1);
        }
        var day = rDate.getDay();
        var date = rDate.getDate();
        while (day != 1 && day != 4 && day != 5){  // Reboots happen on Mondays, Thursdays & Fridays.
            date++;
            rDate.setDate(date);       // Increment until reboot day
            day = rDate.getDay();
        }
        /* Get difference between current time and reboot time in minutes */
        var milliseconds = Math.abs(rDate.getTime() - cDate.getTime());
        var minutes = Math.floor(milliseconds / 60000);
        var hours = Math.floor(minutes/60);         // hours left until reboot
        minutes = minutes-(hours*60);               // minutes left until reboot
        
        /* Put time remaining into a string */
        var timeStr = "" + hours.toString() + "h " + minutes.toString() + "m";
        return (responses.rebootA.replace("{0}", timeStr) + "\n" + responses.rebootB);
    }
}