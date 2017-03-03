const Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
    name: "release",
    desc: "Find out when Star Citizen will be released.",
    fn: (argv, context) => {
        return "soon™ https://robertsspaceindustries.com/schedule-report "
    }
});
