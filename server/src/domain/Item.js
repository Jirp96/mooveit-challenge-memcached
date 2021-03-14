var crypto = require('crypto');
var biguintformat = require('biguint-format');

class Item {
    data = [];
    key;
    storedDate;
    exptime;
    flags;
    casUnique;
    
    constructor(dataBlock, key, exptime, flags) {
        this.data = dataBlock;
        this.key = key;
        this.storedDate = new Date();
        this.exptime = exptime;
        this.flags = flags;
    }

    isExpired() {
        let expired = false;
        const config = require('../config');

        let currentTime = Math.round((new Date()).getTime() / 1000);
        if ( this.exptime > config.MAX_EXPTIME_SECONDS ){ 
            //Per protocol, exptime is UNIX timestamp
            expired = currentTime >= this.exptime ;
        }
        else {
            let storedDateTime = Math.round((this.storedDate).getTime() / 1000);
            expired = currentTime >= (this.exptime + storedDateTime);
        }

        return expired;
    }

    updateCas(){
        this.casUnique = biguintformat(crypto.randomBytes(8), 'dec');
    }

    toString(){
        return `${this.key} ${this.flags} ${this.data.length}`;
    }
}

module.exports = Item;