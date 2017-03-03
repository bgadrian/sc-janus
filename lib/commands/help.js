const Clapp = require('../modules/clapp-discord/index');

module.exports = new Clapp.Command({
  name: "help",
  desc: " ",
  fn: (argv, context) => {
    return "type --help";
  }
});
