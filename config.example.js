module.exports = {

    // Your bot name. Typically, this is your bot's username without the discriminator.
    // i.e: if your bot's username is MemeBot#0420, then this option would be MemeBot.
    name: "Janus",

    // The bot's command prefix. The bot will recognize as command any message that begins with it.
    // i.e: "!Janus foo" or "!foo" will trigger the command "foo",
    //      whereas "Janus foo" will do nothing at all.
    prefix: "!",

    //Add here a space if you want your commands to be like "! command" instead of "!command"
    prefixSeparator: "",

    // Your bot's user token. If you don't know what that is, go here:
    // https://discordapp.com/developers/applications/me
    // Then create a new application and grab your token.
    token: "",

    // If this option is enabled, the bot will delete the message that triggered it, and its own
    // response, after the specified amount of time has passed.
    // Enable this if you don't want your channel to be flooded with bot messages.
    // ATTENTION! In order for this to work, you need to give your bot the following permission:
    // MANAGE_MESSAGES - 	0x00002000
    // More info: https://discordapp.com/developers/docs/topics/permissions
    deleteAfterReply: {
        enabled: true,
        time: 5 * 1000, // In milliseconds
    },
    // If true, the bot will always respond to commands in private messages.
    //This way you ensure that the commands are not poluting the public channels.
    //If set to false, only SOME commands results will be sent to private like Confirm or Latest.
    replyToDM: false,

    //confirm feature will add the roleName to the user on the serverID
    confirm_data: {
        //discord server ID
        serverId: "1111111111",
        //the role to add
        roleName: "member",
    },
    //This is your organisation Spectrum Identification (SID)
    //https://robertsspaceindustries.com/orgs/SID
    organisationSID: "myorg",
    //the /time command will list the current hour for all these timezones (UTC is always included)
    //put here the most popular timezones from your organisation
    timezonesList: [
        "America/Los_Angeles",
        "America/New_York",
        "Europe/London",
        "Europe/Bucharest",
        "Asia/Moscow",
        "Asia/Tokyo",
        "Australia/Sydney",
    ],
    //the bot can change his own nickname, if allowed, at connect
    //usefull only when you do not have permissions to change its nickname as admin
    botNickname: "Janus-AI",
    //a text that will be displayed under its nickanme (Currently playing .... game )
    //you can put a funny message or propaganda
    botGame: 'DM: $ --help. Our bot!'
};
