const Clapp  = require('../modules/clapp-discord/index');
const moment = require('moment-timezone');
const _      = require("lodash");
const cfg    = require('../../config.js');


let format   = "MMM D, HH:mm ZZ z";
let rightPad = (s, c, n) => n - s.length > 0 ? s + c.repeat(n - s.length) : s;

module.exports = new Clapp.Command({
    name: "time",
    desc: "The clock around the real verse.",
    fn: (argv, context) => {
        let utc = moment();

        //TODO make this work
        // if (argv.args["moment"].length > 0)
        //     utc = moment(argv.args["moment"]);

        let result = "```apache" +
            "\n" + rightPad("UTC", " ", 25) + utc.utc().format(format) + "";
        _.each(cfg.timezonesList, (tz) => {
            result += "\n" + rightPad(tz.replace("/", "_"), " ", 25) + utc.tz(tz).format(format);
        });

        //TODO add the ingame time, when the devs invent one
        result += "\n" + rightPad("Star_Citizen_PU", " ", 25) + "soon™";

        return result + "```";
    },
    args: [
        // {
        //     name: 'moment',
        //     desc: 'A specific moment in time ex: 2014-06-01T12:00:00Z "',
        //     type: 'string',
        //     required: false,
        //     default: ""
        // }
    ]
});
