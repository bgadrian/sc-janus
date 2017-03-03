const org_url   = "https://robertsspaceindustries.com/citizens/%HANDLER%/organizations";
const check_url = "https://robertsspaceindustries.com/citizens/%HANDLER%";
const cheerio   = require('cheerio');
const rp        = require('request-promise');
const cfg       = require('../config.js');

module.exports = {
    isMember: function (rsi_handler) {
        let options = {
            method: 'GET',
            uri: org_url.replace("%HANDLER%", rsi_handler)
        };

        return new Promise((fulfill, reject) => {
            rp(options).then((response) => {
                // console.log(response);
                let $      = cheerio.load(response);
                let urls   = $('.orgs-content .value[href="/orgs/' + cfg.organisationSID + '"]');
                let isTest = urls.length > 0;

                fulfill(isTest);
            }).catch(err => {
                console.error(err.message);
                reject(err);
            });
        });
    },
    hasCodeOnProfile: function (rsi_handler, code) {
        let options = {
            method: 'GET',
            uri: check_url.replace("%HANDLER%", rsi_handler)
        };
        return new Promise((fulfill, reject) => {
            rp(options).then((response) => {
                // console.log(response);
                let $       = cheerio.load(response);
                let bio     = $('.entry.bio');
                // console.log(urls);
                let hasCode = bio != null && bio.html() != null &&
                    bio.html().indexOf(code) > -1;

                if (hasCode == false) {
                    console.log("bio found but no code " + bio.html());
                }
                fulfill(hasCode);
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }
};
