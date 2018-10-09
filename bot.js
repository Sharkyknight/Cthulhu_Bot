const Discord = require("discord.js");

const PREFIX = "*";

var bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Ready!`);
});

bot.on('message', message => {
    if (!message.content.startsWith(PREFIX)) {
        return;
    }
    
    var commands = message.content.substring(PREFIX.length).split(" ");
    var dialogues = require("./dialogues.json");
    var messages = require("./messages.json");
    
    user1 = "Sharkyknight";
    
    /**
    * Parameters
    *   obj: JSON object where all values are strings
    *   name: the name of the person to be inserted into the dialogue
    * Return
    *   Randomly selected value within obj, where all {0}s are replaced with name
    */
    function randomDialogue(obj, name){
        if (typeof name === "undefined" || !obj || obj == "null" || obj === "undefined") {    // Parameters incorrect
            return("Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn.");
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
    * Parmeters
    *   d1: Start date
    *   d2: End date
    * Return
    *   Number of weeks between start and end date
    */
    function weeksBetween(d1, d2) {
        return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }
    
    switch (commands[0].toLowerCase()) {
// Commands
    case "labor":
        amount = parseInt(commands[1], 10);
        if (amount > 0) {
        var dubsprice = (amount * 15);
        var breakeven = dubsprice / (72 * 28);
        var breakevenceil = Math.ceil(breakeven);
        message.channel.sendMessage("To breakeven, payment must be, on average, " + breakevenceil + " Poe," + " for 28 calander days.");
        }
        else {
            message.channel.sendMessage("Invalid format. Please type the price of the dub after labor. Example: *labor 3000");
        }
        break;
        case "smh":
        var rotation_Start = new Date("6/2/2018");
        var today_date = new Date();
        var milliseconds_since = today_date.getTime() - rotation_Start.getTime();
        var hours_since = milliseconds_since / (1000 * 3600);
        console.log(hours_since);
        var days_since = ((hours_since - 7) / 24); // do (hours - 8) since GMT --> PST. You screwed up...
        console.log(days_since);
        var week_since = Math.floor(days_since / 7)
        console.log(week_since);
        var rotation_week = (week_since % 4);
        console.log(rotation_week);
        if (rotation_week == 0) {
            message.channel.sendMessage("This week's available map is Cursed Isles :japanese_goblin::skull_crossbones: don't forget your gas mask. \n\n\n Last week's map (expiring Saturday :timer:): Atlantis.\n\n\n Next week's map is Haunted Seas.");
        }
        else if (rotation_week == 1) {
            message.channel.sendMessage("This week's available map is Haunted Seas :ghost: go sink and be a ghost! \n\n\n Last week's map (expiring Saturday :timer:): Cursed Isles.\n\n\n Next week's map is Kraken Hunt.");
        }
        else if (rotation_week == 2) {
            message.channel.sendMessage("This week's available map is Kraken Hunt :squid: what you don't realize is that I was a kraken once, but now I'm a god. Don't piss us off... \n\n\n Last week's map (expiring Saturday :timer:): Haunted Seas.\n\n\n Next week's map is Atlantis.");
        }
        else if (rotation_week == 3) {
            message.channel.sendMessage("This week's available map is Atlantis :dolphin: this is the closest I can do for a Triketos folks. Deal with it. \n\n\n Last week's map (expiring Saturday :timer:): Kraken Hunt.\n\n\n Next week's map is Cursed Isles.");
        }
        break;
        case "time":
            var today = new Date();
            var time_mili = today.getTime();
            var hours_today = Math.floor(time_mili / (3600 * 1000));
            var minutes_today = Math.floor(time_mili / (60 * 1000));
            var hour_now = ((hours_today - 7) % 24); //fix this...
            var hour_PM = (hour_now - 12);
            var minutes_now = ((minutes_today) % 60);
            if (minutes_now < 10) {
                if (hour_now == 0) {
                    message.channel.sendMessage("the time is 12:0" + minutes_now + "AM game time right now");
                }
                else if (hour_now < 12) {
                    message.channel.sendMessage("the time is " + hour_now + ":0" + minutes_now + "AM game time right now");
                }
                else if (hour_now == 12) {
                    message.channel.sendMessage("the time is 12:0" + minutes_now + "PM game time right now");
                }
                else if (hour_now > 12) {
                    message.channel.sendMessage("the time is " + hour_PM + ":0" + minutes_now + "PM game time right now");
                }
            }
            else if (minutes_now >= 10) {
                if (hour_now == 0) {
                    message.channel.sendMessage("the time is 12:" + minutes_now + "AM game time right now");
                }
                else if (hour_now < 12) {
                    message.channel.sendMessage("the time is " + hour_now + ":" + minutes_now + "AM game time right now");
                }
                else if (hour_now == 12) {
                    message.channel.sendMessage("the time is 12:" + minutes_now + "PM game time right now");
                }
                else if (hour_now > 12) {
                    message.channel.sendMessage("the time is " + hour_PM + ":" + minutes_now + "PM game time right now");
                }
            }
            break;
        case "reboot":
            var cDate = new Date(); // Current Date
            var rDate = new Date(); // Next Reboot Date
            /* Set to next Reboot date & time */
            if (rDate.getMinutes > 0){          // Reboot happens on the hour
                rDate.setMinutes(00);
                rDate.setHours(rDate.getHours+1);
            }
            if (rDate.getHours < 4){            //Reboot happens at 4am
                rDate.setHours(4);
            }
            else{                               // After 4am need to increase the date
                rDate.setHours(4);
                rDate.setDate(rDate.getDate()+1);
            }
            var day = rDate.getDay();
            while (day != 1 && day != 3 && day != 5){  // Reboots happen on Mondays, Wednesdays & Thursdays.
                rDate.setDate(rDate.getDate()+1);       // Increment until reboot day
            }
            /* Get difference between current time and reboot time */
            var seconds = Math.abs(rDate - cDate) / 1000;
            var days = Math.floor(seconds/86400);       // days left until reboot
            seconds -= (days * 86400);
            var hours = Math.floor(seconds/3600) % 24;  // hours left until reboot
            seconds -= hours*3600;
            var minutes = Math.floor(seconds/60) % 60;  // minutes left until reboot
            seconds -= minutes*60;
            /* Put time remaining into a string */
            var timeStr = "" + days + "d " hours + "h " + minutes + "m";
            var msg = messages.rebootA.replace("{0}", timeStr);
            message.channel.sendMessage(msg);
            message.channel.sendMessage(messages.rebootB);
            break;
        case "free":
            var date = new Date();
            var day = date.getDay();
            if (day == 0) { // Sunday
                message.channel.sendMessage(messages.blacksmith);
                message.channel.sendMessage(messages.drinkpoker);
            }
            else if (day == 1) {    // Monday
                message.channel.sendMessage(messages.weave);
                message.channel.sendMessage(messages.sfrumspades);
            }
            else if (day == 2) {    // Tuesday
                message.channel.sendMessage(messages.forage);
                message.channel.sendMessage(messages.tdhearts);
            }
            else if (day == 3) {    // Wednesday
                message.channel.sendMessage(messages.alchem);
                message.channel.sendMessage(messages.drinkhearts);
            }
            else if (day == 4) {    // Thursday
                message.channel.sendMessage(messages.nolabor);
                message.channel.sendMessage(messages.sfrumspades);
            }
            else if (day == 5) {    // Friday
                message.channel.sendMessage(messages.distill);
                message.channel.sendMessage(messages.tdpoker);
            }
            else {  // Saturday
                message.channel.sendMessage(messages.swipwright);
                message.channel.sendMessage(messages.sfrum);
            }
            break;
        case "rotation":
            message.channel.sendMessage(messages.rotation);
            break;
        case "help":
            message.channel.sendMessage(messages.help);
            break;
        
        // Dialogues
        case "poem":
            var poetry = randomDialogue(dialogues.poem, commands[1]);
            message.channel.sendMessage(poetry);
            break;
        case "sharky":
            message.channel.sendMessage(messages.sharky);
            break;
        case "iwnabeu":
            message.channel.sendMessage(messages.iwnabeu);
            break;
        // TODO
        
        // Comments
        case "001comment":
            var comment = (message.author.username == user1) ? messages.commentA : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002comment":
            var comment = (message.author.username == user1) ? messages.commentB : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "003comment":
            var comment = (message.author.username == user1) ? messages.commentC : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "004comment":
            var comment = (message.author.username == user1) ? messages.commentD : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "001update":
            var comment = (message.author.username == user1) ? messages.updateA : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002update":
            var comment = (message.author.username == user1) ? messages.updateB : messages.rejected;
            message.channel.sendMessage(comment);
            break;

        // Introduction
        case "001introduction":
            var intro = (message.author.username == user1) ? messages.intro : messages.rejected;
            message.channel.sendMessage(intro);
            break;
    }
});
bot.login(process.env.BOT_TOKEN);
