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
        var start_date = new Date("6/3/2018");
        var today_date = new Date();
        var milliseconds_since = today_date.getTime() - start_date.getTime();
        var hours_since = (milliseconds_since / (1000 * 3600));
        console.log(hours_since);
        var days_since = (Math.floor((hours_since - 7) / 24));
        console.log(days_since);
        var day = (days_since % 7);
        console.log(day);
        if (day == 0) {
            message.channel.sendMessage("The free Labor puzzle today is Blacksmithing.");
            message.channel.sendMessage("The free Parlor puzzles today are Drinking and poker.");
        }
        else if (day == 1) {
            message.channel.sendMessage("The free Labor puzzle today is Weaving.");
            message.channel.sendMessage("The free Parlor puzzles today are Swordfighting, Rumble, and Spades.");
        }
        else if (day == 2) {
            message.channel.sendMessage("The free Labor puzzle today is Foraging. You can do the puzzle if you ask someone to job you one the NB even with no badge.");
            message.channel.sendMessage("The free Parlor puzzles today are Treasure Drop and Hearts.");
        }
        else if (day == 3) {
            message.channel.sendMessage("The free Labor puzzle today is Alchemistry.");
            message.channel.sendMessage("The free Parlor puzzles today are Drinking and Hearts.");
        }
        else if (day == 4) {
            message.channel.sendMessage("There is no free Labor puzzle today.");
            message.channel.sendMessage("The free Parlor puzzles today are Swordfighting, Rumble, and Spades.");
        }
        else if (day == 5) {
            message.channel.sendMessage("The free Labor puzzle today is Distilling.");
            message.channel.sendMessage("The free Parlor puzzles today are Treasure drop and Poker.");
        }
        else if (day == 6) {
            message.channel.sendMessage("The free Labor puzzle today is Shipwrightery.");
            message.channel.sendMessage("The free Parlor puzzles today are Swordfighting and Rumble.");
        }
        break;
    case "rotation":
        message.channel.sendMessage("The map rotation is as follows: \n\n Cursed Isles. \n Haunted Seas. \n Kraken Hunt. \n Atlantis.");
        break;
    case "help":
        message.channel.sendMessage("List of current powers: \n\n *smh: Shows the current, previous, and upcoming SMH maps. \n *rotation: Shows the order of rotation for SMH maps. \n *reboot: Shows when the next ingame scheduled reboot is going to occur. \n *free: Shows the free Labor & Parlor puzzles of the day. \n *labor (dub price): Shows how much you must get paid per hour for breakeven with the (dub price) you enter \n *time: Shows current game time");
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
