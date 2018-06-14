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

    switch (commands[0].toLowerCase()) {

       case "labor":
            amount = parseInt(commands[1], 10);
            var dubsprice = (amount * 15);
            var breakeven = dubsprice / (72 * 28);
            var breakevenceil = Math.ceil(breakeven);
            message.channel.sendMessage("To breakeven, payment must be, on average, " + breakevenceil + " Poe," + " for 28 calander days.");
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
        case "introduction001":
                 message.channel.sendMessage("Behold the rise of the ancient one. A pirate's worst nightmare has arrived. A half octopus, half dragon, man-like sea monster is what I am. If it wasn't for the curse of which Sharkyknight has sealed me with, you would've been taking your last breaths... As an ancient being, I have different powers of which I can use. You may access the list using *help. Of course, my powers will gradually grow, adding more to what I can do... until the seal breaks... then... it will not matter to which god you pray, as the end is then inevitable...");
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
        case "update001":
            message.channel.sendMessage("HA! My powers are growing... and so comes closer your inevitable end... Soon, you will be no more...");
            break;
            case "update002":
            message.channel.sendMessage("You are unlocking more powers for me to use... you think this is helping you, but it's only making me STRONGER...");
            break;
        case "help":
            message.channel.sendMessage("List of current powers: \n\n *smh: Shows the current, previous, and upcoming SMH maps. \n *rotation: Shows the order of rotation for SMH maps. \n *reboot: Shows when the next ingame scheduled reboot is going to occur. \n *free: Shows the free Labor & Parlor puzzles of the day. \n *labor (dub price): Shows how much you must get paid per hour for breakeven with the (dub price) you enter \n *time: Shows current game time");
            break;

        case "rotation":
            message.channel.sendMessage("The map rotation is as follows: \n\n Cursed Isles. \n Haunted Seas. \n Kraken Hunt. \n Atlantis.");
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
    }
});
bot.login(process.env.BOT_TOKEN);
