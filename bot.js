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

        case "smh":
            var rotationStart = new Date("1/13/2018");
            var today = new Date();
            var milliseconds = today.getTime() - rotationStart.getTime();
            var hours = milliseconds / (1000 * 3600);
            console.log(hours);
            var days = ((hours - 8) / 24); // do (hours - 8) before hosting on github since GMT --> PST
            console.log(days);
            var week = Math.floor(days / 7)
            console.log(week);
            var index = (week % 4);
            console.log(index);
            if (index == 0) {
                message.channel.sendMessage("This week's available map is Cursed Isles. \n\n\n Last week's map (expiring Saturday): Atlantis.\n\n\n Next week's map is Haunted Seas.");
            }
            else if (index == 1) {
                message.channel.sendMessage("This week's available map is Haunted Seas. \n\n\n Last week's map (expiring Saturday): Cursed Isles.\n\n\n Next week's map is Kraken Hunt.");
            }
            else if (index == 2) {
                message.channel.sendMessage("This week's available map is Kraken Hunt. \n\n\n Last week's map (expiring Saturday): Haunted Seas.\n\n\n Next week's map is Atlantis.");
            }
            else if (index == 3) {
                message.channel.sendMessage("This week's available map is Atlantis. \n\n\n Last week's map (expiring Saturday): Kraken Hunt.\n\n\n Next week's map is Cursed Isles.");
            }
            break;

        case "help":
            message.channel.sendMessage("List of current commands: \n\n *smh: Shows the current, previous, and upcoming SMH maps. \n *rotation: Shows the order of rotation for SMH maps. \n *quack: my maker decided to keep this command. It forces me to say weird sentences. \n *(secret): Easter Egg command. Humor me...");
            break;

        case "rotation":
            message.channel.sendMessage("The map rotation is as follows: \n\n Cursed Isles. \n Haunted Seas. \n Kraken Hunt. \n Atlantis.");
            break;

        case "quack":
            message.channel.sendMessage("I am the SMH Rotation Bot, first daughter of Duckie of House Pure Malice, First of Her Name, the Mascot, Nerd #1, Writer of Code and Mother of Bots.");
            break;       
    }
});

bot.login(process.env.BOT_TOKEN);
