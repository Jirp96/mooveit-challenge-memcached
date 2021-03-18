var crypto = require('crypto');
var biguintformat = require('biguint-format');
const constants = require('../constants');

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

        let currentTime = Math.round((new Date()).getTime() / 1000);
        if ( this.exptime > constants.MAX_EXPTIME_SECONDS ){ 
            //Per protocol, exptime is UNIX timestamp
            expired = currentTime >= this.exptime ;
        }
        else if ( this.exptime > 0 ){
            //Per protocol, keys with exptime 0 never expire
            let storedDateTime = Math.round((this.storedDate).getTime() / 1000);
            expired = currentTime >= (this.exptime + storedDateTime);
        }
        else if ( this.exptime < 0 ){
            expired = true;
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