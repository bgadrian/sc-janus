const Clapp = require('../modules/clapp-discord');
const _   = require('../../node_modules/lodash');

module.exports = new Clapp.Command({
    name: "decide",
    desc: "Let Janus decide for you: decide Should I buy another ship?",
    fn: (argv, context) => {

        try {
            if (context.msg.content.indexOf('?') == -1) {
                return 'Is there a question mark?';
            }

            let truly = [
                "Affirmative. :ok_hand: ",
                "Definitely. :ok_hand: ",
                "Go for it! :ok_hand: "
            ];
            let falsy = ["NO! :no_entry_sign: ", "False. :no_entry: ", "No way. :no_entry: "];
            let maybe = ["Haven't decided yet.", "Figure it yourself.", "Return later I'm busy."];

            let rdm = Math.random();
            if (rdm < 0.45)
                return _.sample(truly);
            else if (rdm < 0.8)
                return _.sample(falsy);
            else
                return _.sample(maybe);
        } catch (err) {
            console.error(err);
            return "Error inside.";
        }
    }
});
