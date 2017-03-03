//https://robertsspaceindustries.com/citizens/ExampleHandler/organizations

const _              = require('../../node_modules/lodash');
const Clapp          = require('../modules/clapp-discord/index');
const cgi_api        = require('../cgi_api');
const code_generator = require('../code_generator');
const cfg            = require('../../config.js');


let success_code_str   = "Congrats, we verified your account. You can remove the code now.";
let success_failed_add = "We verified your account, but there was an error adding your membership role";
let failed_code_str    = "We need to confirm your account, please add this code %CODE% "
    + " to your 'Short Bio' field here https://robertsspaceindustries.com/account/profile and then repeat this command.";
let already_str        = "You already are a proud member!";

module.exports = new Clapp.Command({
    name: "confirm",
    desc: "Confirm your organisation membership and get your discord member role.",
    fn: (argv, context) => {
        try {
            let rsi_handler = argv.args["RSIhandler"];

            //if is already a test, nothing to confirm
            if (hasMemberRole(context.discord, context.msg.author)) {
                return already_str;
            }

            //the bot replies make no sense on a public chat
            context.respondToUser = context.msg.author;
            let code              = code_generator.getDaily(rsi_handler);

            //TODO refactor - use promises correctly
            return new Promise((fulfill, reject) => {
                (cgi_api.isMember(rsi_handler)).then((isMember) => {
                    if (isMember) {

                        (cgi_api.hasCodeOnProfile(rsi_handler, code)).then((hasCode) => {
                            if (hasCode) {

                                addMemberRole(context.discord, context.msg.author)
                                    .then(roleWasAdded => {

                                        if (roleWasAdded) {
                                            fulfill({
                                                message: success_code_str,
                                                context: context
                                            });
                                        } else {
                                            fulfill({
                                                message: success_failed_add,
                                                context: context
                                            });
                                        }
                                    }).catch(err2 => {
                                    console.error(err2);
                                    fulfill({
                                        message: success_failed_add,
                                        context: context
                                    });
                                });

                            } else {
                                fulfill({
                                    message: failed_code_str.replace('%CODE%', code),
                                    context: context
                                });
                            }
                        })

                    } else {
                        fulfill({
                            message: "You must be a public member of our organisation.",
                            context: context
                        });
                    }
                }).catch(err => {
                    // fulfill("Error " + err);
                    reject(err);
                });
            });
        } catch (err) {
            console.error(err);
            return "Error inside :(.";
        }
    },
    args: [
        {
            name: 'RSIhandler',
            desc: 'Your StarCitizen handler',
            type: 'string',
            required: true,
            default: ' '
        }
    ]
});

/**
 *  Adds your organisation member role to an discord user.
 * @param discordClient
 * @param discordUser
 * @return {Promise} Promise<GuildMember>
 */
function addMemberRole(discordClient, discordUser) {
    return new Promise((fulfill, reject) => {
        let discordServer = discordClient.guilds[cfg.confirm_data.serverId];

        if (discordServer == null || discordServer.available == false) {
            reject("Cannot find guild/server " + cfg.confirm_data.serverId);
            return;
        }

        let memberRole = discordServer.roles.find(val => val.name == cfg.confirm_data.roleName);

        if (memberRole == null) {
            reject("Cannot find the role " + cfg.confirm_data.roleName);
            return;
        }

        let asGuildMember = discordServer.members[discordUser.id];

        if (asGuildMember == null) {
            reject("Cannot find you as an user of  discord " + discordServer.name);
            return;
        }

        asGuildMember.addRole(memberRole).then((guildMember) => {
            let newRole = guildMember.roles.find(role => role.id == memberRole.id);
            fulfill(newRole != null);
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Checks if a specific discord user already has the member role.
 * @param discordClient
 * @param discordUser
 * @return {boolean}
 */
function hasMemberRole(discordClient, discordUser) {
    try {
        let discordServer = discordClient.guilds[cfg.confirm_data.serverId];

        if (discordServer == null || discordServer.available == false) {
            return false;
        }

        let testRole = discordServer.roles.find(val => val.name == cfg.confirm_data.roleName);

        if (testRole == null) {
            return false;
        }

        let asGuildMember = discordServer.members[discordUser.id];

        if (asGuildMember == null) {
            return false;
        }

        let newRole = asGuildMember.roles.find(role => role.id == testRole.id);

        return newRole != null;
    } catch (err) {
        console.error(err);
        return false;
    }
}