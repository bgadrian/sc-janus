const Clapp   = require('../modules/clapp-discord/index');
const rp      = require('request-promise');
const cheerio = require('cheerio');

module.exports = new Clapp.Command({
    name: "beer",
    desc: "Quench your thirst!",
    fn: (argv, context) => {

        try {
            let options = {
                method: 'GET',
                uri: 'https://beeroverip.org/random/'
            };

            return new Promise((fulfill, reject) => {
                rp(options).then((asHTML) => {
                    let response = "";

                    try {
                        let $    = cheerio.load(asHTML);
                        let img  = $('img', "#drink");
                        response = "Here's a ***" + img.attr("alt") + "*** \n"
                            + img.attr("src");

                    } catch (err2) {
                        console.error(err2);
                        response = "Sorry the bar is closed :(";
                    }
                    fulfill({
                        message: response,
                        context: context
                    });
                }).catch(err => {
                    console.error(err);
                    reject(err);
                });
            });
        } catch (err) {
            console.error(err);
            return "Error inside :(.";
        }
    }
});

