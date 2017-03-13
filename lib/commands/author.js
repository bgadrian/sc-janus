const Clapp = require('../modules/clapp-discord');
const _     = require('../../node_modules/lodash');

module.exports = new Clapp.Command({
    name: "author",
    desc: "The real identity of my father",
    fn: (argv, context) => {

        try {
            return "I was made by the SC Center team, you can visit my childhood house https://starcitizen.center/";
        } catch (err) {
            console.error(err);
            return "Error inside.";
        }
    }
});
