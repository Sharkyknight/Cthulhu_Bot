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
            var clock = new Date();
            if (clock.getHours < 8){            // Remove 8 hours from current time
                var timern = clock.getHours();
                message.channel.sendMessage("A" + clock.toTimeString());
                clock.setDate(clock.getDate-1);
                message.channel.sendMessage("B" + clock.toTimeString());
                clock.setHours(clock.getHours()+(16+timern));
                message.channel.sendMessage("C" + clock.toTimeString());
            }
            else {
                message.channel.sendMessage("D" + clock.toTimeString());
                var temp = clock.getHours - 8;
                clock.setHours(temp);
            }
            message.channel.sendMessage("E" + clock.toTimeString());
            var msg = messages.clock.replace("{0}", clock.toTimeString());
            message.channel.sendMessage(msg);
            break;
        case "reboot":
        var rotationStart = new Date("6/2/2018");
        var today = new Date();
        var time = today.getTime();
        var milliseconds_since = today.getTime() - rotationStart.getTime();
        var hours_since = milliseconds_since / (1000 * 3600);
        console.log(hours_since);
        var days_since = Math.floor((hours_since - 11) / 24); // reboots happen at 7 my time, thus 7-7 = 14 with adjustment
        console.log(days_since);
        var daily = (days_since % 7);
        console.log(daily);
        var hours_today = (Math.floor(hours_since - 11)) % 24;
        console.log(hours_today);
        var remaininghours1 = (71 - hours_today);
        var remaninghours11 = remaininghours1 + 1;
        var remaininghours2 = (47 - hours_today);
        var remaininghours22 = remaininghours2 + 1;
        var remaininghours3 = (23 - hours_today);
        var remaininghours33 = remaininghours3 + 1;
        var minutes = Math.floor(time / (60000));
        var minutes_now = ((minutes) % 60);
        var minutes_remaining = (60 - minutes_now);
        if (daily == 0) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours22 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours2 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 1) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours33 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours3 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 2) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours11 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours1 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 3) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours22 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours2 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 4) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours33 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours3 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 5) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours33 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours3 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
        else if (daily == 6) {
            if (minutes_now == 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours11 + "h 0m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
            else if (minutes_now > 0) {
                message.channel.sendMessage("The next purge will be in " + remaininghours1 + "h " + minutes_remaining + "m. Prepare yourselves!");
                message.channel.sendMessage("Scheduled purges occur every Monday, Thursday, and Friday, at 4AM game time. Your end is inevitable!");
            }
        }
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
