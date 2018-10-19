const Discord = require("discord.js");

const PREFIX = "*";

var bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Ready!`);
    bot.user.setGame(`*help`);    
});

bot.on('message', message => {
    var commands = message.content.substring(PREFIX.length).split(" ");
    var admins = ["Sharkyknight", "Carsomyr"];

    var responses = require("./responses.json");
    var dialogues = require("./entertainment/dialogues.json");
    var blackBox = require("./entertainment/blackBox.js");
    var complement = require("./entertainment/complement.js");
    var timechecks = require("./commands/timechecks.js");
    var calculators = require("./commands/calculators.js");
    var misc = require("./entertainment/misc.js");

    var selfieChannel = "selfies-pls";
    var userIsAdmin = admins.includes(message.author.username);   // User has admin permissions
    //var targetName = (typeof commands[1] === "undefined" || commands[1] === "me") ? message.author.username : commands[1];
    

    /* Auto-respond to selfies with appreciation */
    if (message.channel.name == selfieChannel){
        if (message.attachments.size > 0){
            message.channel.sendMessage(complement.getDialogue("admire", "<@" + message.author.id + ">"));
        }
        return;
    }
    
    /* Restrict responses to correct prefix; exclude channels */
    if (!message.content.startsWith(PREFIX) || message.channel.name == selfieChannel) {
        return;
    }
    
    switch (commands[0].toLowerCase()) {
        // Commands
        case "test":
            message.channel.sendMessage("test");
            break;
        case "rum":         // Calculate which alcohol is the best value
            message.channel.sendMessage(calculators.getRum(commands[1], commands[2], commands[3]));
            break;
        case "labor":       // Find required labour cost to cover badge cost
            message.channel.sendMessage(calculators.getLabor(commands[1]));
            break;
        case "smh":
            message.channel.sendMessage(timechecks.getSMH());
            break;
        case "time":
            message.channel.sendMessage(timechecks.getTime());
            break;
        case "reboot":
            message.channel.sendMessage(timechecks.reboot());
            break;
        case "free":
            message.channel.sendMessage(timechecks.freePuzzles());
            break;
        case "rotation":
            message.channel.sendMessage(responses.rotation);
            break;
        case "help":
            message.channel.sendMessage(responses.help);
            break;
        
        // Dialogues, with commands
        case "admire":      // Autoresponse to selfies
            message.channel.sendMessage(complement.getDialogue("admire", targetName));
            break;
        case "appreciate":
            message.channel.sendMessage(complement.getDialogue("appreciate", targetName));
            break;
        case "pickup":
            message.channel.sendMessage(complement.getDialogue("pickup", targetName));
            break;
        case "poem":
            message.channel.sendMessage(complement.getDialogue("poem", targetName));
            break;
        case "magic8ball":      // Yes, no, maybe responses
            message.channel.sendMessage(complement.getDialogue("magicball", targetName));
            break;
        case "goodnight":       // Say goodnight to someone who logged off too quick
            message.channel.sendMessage(responses.night.replace("{0}", targetName));
            break;
        case "feed":
            var food = userIsAdmin ? commands[1] : message.author.username;
            message.channel.sendMessage(responses.feed.replace("{0}", food));
            break;
        case "endlife":
            message.channel.sendMessage(misc.endLife(commands[1], commands[2]));
            break;

        // Dialogues, without commands
        case "blackbox":
            var reply = responses.blackbox.replace("{0}", blackBox.useBox());
            message.channel.sendMessage(reply);
            break;
        case "sharky":
            message.channel.sendMessage(responses.sharky);
            break;
        case "iwnabeu":
            message.channel.sendMessage(responses.iwnabeu);
            break;
        case "loveme":
            message.channel.sendMessage(responses.loveme.replace("{0}", message.author.username));
            break;
        
        // Admin only
        case "001comment":
            var comment = userIsAdmin ? responses.commentA : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002comment":
            var comment = userIsAdmin ? responses.commentB : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "003comment":
            var comment = userIsAdmin ? responses.commentC : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "004comment":
            var comment = userIsAdmin ? responses.commentD : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "001update":
            var comment = userIsAdmin ? responses.updateA : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "002update":
            var comment = userIsAdmin ? responses.updateB : responses.rejected;
            message.channel.sendMessage(comment);
            break;
        case "cthulhu":
            message.channel.sendMessage(misc.cthulhu(userIsAdmin, commands));
            break;

        // Introduction
        case "001introduction":
            var intro = (message.author.username == admins[0]) ? responses.intro : responses.rejected;
            message.channel.sendMessage(intro);
            break;
    }
        
});
bot.login(process.env.BOT_TOKEN);
