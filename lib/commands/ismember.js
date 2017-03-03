//https://robertsspaceindustries.com/citizens/NutCaze/organizations

const _       = require('../../node_modules/lodash');
const Clapp   = require('../modules/clapp-discord/index');
const cgi_api = require('../cgi_api');

module.exports = new Clapp.Command({
    name: "isMember",
    desc: "Confirms that a RSI handler exists and that is part of our organisation.",
    fn: (argv, context) => {
        try {
            let rsi_handler = argv.args["RSIhandler"];

            //context.respondToUser = context.msg.author;

            return new Promise((fulfill, reject) => {
                (cgi_api.isMember(rsi_handler)).then((isMember) => {
                    if (isMember) {
                        fulfill({
                            message: "Organisation affiliation confirmed. ",
                            context: context
                        });
                    } else {
                        fulfill({
                            message: "Access denied, cannot confirm organisation affiliation.",
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
            desc: 'A RSI handler',
            type: 'string',
            required: true,
            default: ' '
        }
    ]
});
