const Clapp    = require('../modules/clapp-discord/index');
let cached     = undefined;
const cacheTTL = 60 * 1000;//seconds * ms
const rp       = require('request-promise');


module.exports = new Clapp.Command({
    name: "pledge",
    desc: "Basic stats on SC/SQ42 funding campaign",
    fn: (argv, context) => {

        try {
            if (typeof(cached) != "undefined") {
                return {
                    message: cached,
                    context: context
                };
            }

            //https://robertsspaceindustries.com/api/stats/getCrowdfundStats
            let options = {
                method: 'POST',
                json: true,
                uri: 'https://robertsspaceindustries.com/api/stats/getCrowdfundStats',
                headers: {
                    "Origin": "https://robertsspaceindustries.com",
                    "content-type": "application/json",
                }, body: {"chart": "month", "fans": true, "funds": true, "alpha_slots": true, "fleet": true}
            };

            return new Promise((fulfill, reject) => {
                rp(options).then((asJson) => {
                    let funds = "-1";
                    try {
                        funds = parseInt(asJson.data.funds / 100);//they included the decimals too
                    } catch (err) {
                        console.error(asJson);
                        console.error(err);
                        reject(err);
                    }

                    // Create our number formatter.
                    let formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                    });
                    let regular   = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                    });

                    funds = formatter.format(funds);

                    cached = "```css\nSo far CGI {raised: " + funds + "USD; from: "
                        + regular.format(asJson.data.fans) + "_fans;combined_fleet_of: "
                        + regular.format(asJson.data.fleet) + "_ships;}```";

                    setTimeout(() => {
                        cached = undefined;
                    }, cacheTTL);

                    fulfill({
                        message: cached,
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
    }
});

