'use strict';

const fs      = require('fs');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();

const app = new Clapp.App({
    name: cfg.name,
    desc: pkg.description,
    prefix: cfg.prefix,
    version: pkg.version,
    separator: cfg.prefixSeparator,
    onReply: (msg, context) => {
        try {
            if (cfg.deleteAfterReply.enabled && context.isDM == false) {
                if (context.msg.deletable)
                    context.msg.delete(cfg.deleteAfterReply.time)
                        .then(msg => console.log(`Deleted message from ${msg.author}`))
                        .catch(console.error);
            }

            //if we must reply as a direct message
            if (cfg.replyToDM) {
                context.msg.author.sendMessage('\n' + msg);
            } else if (context.respondToUser) {
                //each Command can force the message to be a DM, to a specific user
                context.respondToUser.sendMessage('\n' + msg);
            } else {
                //default behaviour, reply in the same context the command arrived
                context.msg.reply('\n' + msg).then(bot_response => {

                }).catch((err) => {
                    console.error(err);
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
    app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
    // Fired when someone sends a message, on any text channel or as DM
    try {
        if (app.isCliSentence(msg.content)) {
            app.parseInput(msg.content, {
                msg: msg,
                //some helpers added for future laziness
                discord: bot,
                isDM: msg.channel.type == "dm",
                sender: msg.user,
                // Keep adding properties to the context as you need them
            });
        }
    } catch (err) {
        console.error(err);
    }
});

bot.login(cfg.token).then(() => {
    bot.user.setUsername(cfg.botNickname);
    bot.user.setGame(cfg.botGame, "");
    console.log('Running!');
}).catch((err) => {
    console.error(err);
});

