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
            var days_since = ((hours_since - 8) / 24); // do (hours - 8) since GMT --> PST. You screwed up...
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
        case "introduction":
                 message.channel.sendMessage("Behold the rise of the ancient one. A pirate's worst nightmare has arrived. A half octopus, half dragon, man-like sea monster is what I am. If it wasn't for the curse of which Sharkyknight has sealed me with, you would've been taking your last breaths... As an ancient being, I have different powers of which I can use. You may access the list using *help. Of course, my powers will gradually grow, adding more to what I can do... until the seal breaks... then... it will not matter to which god you pray, as the end is then inevitable...");
            break;

        case "help":
            message.channel.sendMessage("List of current powers: \n\n *smh: Shows the current, previous, and upcoming SMH maps. \n *rotation: Shows the order of rotation for SMH maps. \n *labor (dub price): Shows how much you must get paid per hour for breakeven with the (dub price) you enter \n *time: Shows current game time");
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
