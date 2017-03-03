function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

module.exports = {
    /**
     * "true random" one time hash, if you want to use this you need to make your own confirmation system
     * keep the code stored in a persistent environment.
     * @return {*}
     */
    getRandom: function () {
        return s4() + s4();
    },
    /**
     * Generates a "random" code, based on the current UTC date and the RSI letter characters.
     * This way the system is simpler (we don't need to keep a code in the database for X hours.
     * @param rsiHandler
     * @return {string}
     */
    getDaily: function (rsiHandler) {
        let dat         = new Date();
        let fixedSecret = 931321123 + dat.getUTCFullYear() + dat.getUTCDate();
        let personal    = rsiHandler.charCodeAt(0) + rsiHandler.charCodeAt(1);

        return (fixedSecret + personal).toString(16);
    }
};