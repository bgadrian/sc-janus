const Clapp = require('../modules/clapp-discord');
const _     = require('../../node_modules/lodash');
const rp    = require('request-promise');
//https://github.com/request/request-promise

//each request must be cached, because is a slow operation
let cached     = {};
const cacheTTL = 15 * 1000;//seconds * ms

function parseBeautify(argv, jsonResponse) {
    let result = "";
    let source = argv.args.source;

    try {
        if (source == "reddit") {
            _.each(jsonResponse.data.children, (post) => {
                if (post.data.stickied == true)
                    return true;

                result += "\n" + post.data.title + ": " + post.data.url;
            });
        }
    } catch (ex) {
        result = "Error at parse."
    }

    return result;
}

module.exports = new Clapp.Command({
    name: "latest",
    desc: "Bring you the latest:  reddit|hotties",
    fn: (argv, context) => {

        try {
            let options = {
                method: 'GET',
                json: true
            };

            switch (argv.args.source) {
                case "reddit":
                    options.uri = 'http://www.reddit.com/r/starcitizen/.json';
                    options.qs  = {
                        "sort": "new", "limit": 5
                    };
                    break;
                default:
                    return "Not implemented (yet, bring some beers to the devs).";
                    break;
            }
            //we always force this Command to respond in private, is a shit long message of previews
            context.respondToUser = context.msg.author;

            let source = argv.args.source;
            if (typeof(cached[source]) != "undefined") {
                return {
                    message: cached[source],
                    context: context
                };
            }

            return new Promise((fulfill, reject) => {
                rp(options).then((response) => {
                    cached[source] = parseBeautify(argv, response);
                    setTimeout(() => {
                        cached[source] = undefined;
                    }, cacheTTL);

                    fulfill({
                        message: cached[source],
                        context: context
                    });
                }).catch(err => {
                    reject(err);
                });
            });
        } catch (err) {
            console.error(err);
            return "Error inside :(.";
        }
    }, args: [
        {
            name: 'source',
            desc: 'One of reddit|hotties',
            type: 'string',
            required: false,
            default: 'reddit'
        }
    ],
});
