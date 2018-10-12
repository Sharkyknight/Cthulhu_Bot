const Discord = require("discord.js");

const PREFIX = "*";

var bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Ready!`);
    bot.user.setGame(`*help`);    
});

bot.on('message', message => {
    var commands = message.content.substring(PREFIX.length).split(" ");
    var dialogues = require("./dialogues.json");
    var messages = require("./messages.json");
    
    user1 = "Sharkyknight";
    user2 = "Carsomyr";
        
    /**
    * Parameters
    *   obj: JSON object where all values are strings
    *   name: the name of the person to be inserted into the dialogue
    * Return
    *   Randomly selected value within obj, where all {0}s are replaced with name
    */
    function randomDialogue(obj, name){
        if (typeof name === "undefined" || !obj || obj == "null" || obj === "undefined") {    // Parameters incorrect
            return(messages.error);
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

    /**
    * Return
    *   Returns a Date object set to YPP current time
    */
    function getClock(){
        var clock = new Date();
        if (clock.getHours < 8){            // Remove 8 hours from current time
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
    * Parmeters
    *   d1: Start date
    *   d2: End date
    * Return
    *   Number of weeks between start and end date
    */
    function weeksBetween(d1, d2) {
        return Math.floor((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }
    
    if (!message.content.startsWith(PREFIX)) {
        if (message.author.username === user2 && message.channel.name == "general"){
            message.channel.sendMessage(message.author.username);
            message.channel.sendMessage(message.author.tag);
            message.channel.sendMessage("\@Carsomyr4002");
        }    
        if (message.author.username === "Alerik" && message.channel.name == "selfies-pls"){
            if (message.attachments.size > 0){
                message.channel.sendMessage(tripleAppreciate(message.sent.author.username));
            }
        }
        return;
    }
    
    switch (commands[0].toLowerCase()) {
        // Commands
        case "labor":       // Find required labour cost to cover badge cost
            var amount = parseInt(commands[1], 10);
            var breakeven = (amount > 0) ? Math.ceil(((amount * 15) / (72 * 28))) : 0;      // Calculate cost to break even; 0 if invalid
            var laborMsg = (breakeven > 0) ? messages.labor.replace("{0}", breakeven) : messages.invalidLabor;
            message.channel.sendMessage(laborMsg);
            break;
        case "smh":
            var numWeeks = weeksBetween(new Date("6/2/2018"), new Date());
            var rmndr = numWeeks % 4;
            var msg = (rmndr == 0) ? messages.CI : (rmndr == 1) ? messages.HS : (rmndr == 2) ? messages.KH : messages.AT;
            message.channel.sendMessage(msg);
            break;
        case "time":
            var clock = getClock();
            var msg = messages.clock.replace("{0}", clock.toTimeString());
            msg = msg.slice(0, -25);
            message.channel.sendMessage(msg + " Game Time");
            break;
        case "reboot":
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
        case "pickup":
            var response = (typeof commands[1] === "undefined") ? messages.pickupfail : randomDialogue(dialogues.pickup, commands[1]);
            message.channel.sendMessage(response);
            break;
        case "poem":
            var response = (typeof commands[1] === "undefined") ? messages.cthpoem : randomDialogue(dialogues.poem, commands[1]);
            message.channel.sendMessage(response);
            break;
        case "magic8ball":
            var response = (typeof commands[1] === "undefined") ? messages.magicfail : randomDialogue(dialogues.magicball, commands[1]);
            message.channel.sendMessage(response);
            break;
        case "appreciate":
            var name = (typeof commands[1] === "undefined" || commands[1] === "me") ? message.author.username : commands[1];
            var msg = tripleAppreciate(name);
            message.channel.sendMessage(msg);
            break;
        case "goodnight":
            var msg = (typeof commands[1] === "undefined") ? messages.nightfail.replace("{0}", message.author.username) : messages.night.replace("{0}", commands[1]);
            message.channel.sendMessage(msg);
            break;
        case "sharky":
            message.channel.sendMessage(messages.sharky);
            break;
        case "iwnabeu":
            message.channel.sendMessage(messages.iwnabeu);
            break;
        case "loveme":
            message.channel.sendMessage(messages.loveme.replace("{0}", message.author.username));
            break;
        case "cthulhu":
            var msg = "Ehh..";
            for (var i=0; i<commands.length; i++){
                var temp = commands[i].toLowerCase();
                if (temp.includes("jojo") || temp.includes("sharky") || temp.includes("carso") || temp == "me" || temp == "too" || temp.includes("paste")) {
                    msg = "Very much so!";
                    break;
                }
            }
            var comment = (message.author.username == user1 || message.author.username == user2 || message.author.username == "pasteyman" || message.author.username == "Vermiljoen" ) ? msg : messages.rejected;
            message.channel.sendMessage(comment);
            break;
            
        
        // Comments
        case "001comment":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.commentA : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002comment":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.commentB : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "003comment":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.commentC : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "004comment":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.commentD : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "001update":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.updateA : messages.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002update":
            var comment = (message.author.username == user1 || message.author.username == user2) ? messages.updateB : messages.rejected;
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
