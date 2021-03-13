const constants = require("../constants");
const Response = require("./Response");

class RetrievalResponse extends Response {
    items = [];

    constructor(type, items){
        super(type);
        this.items = items;
    }

    toString(){
        let response = "";
        
        this.items.forEach(item => {
            let casUnique = 0; //TODO: Add proper 64-bit unique integer, also update & set it on storage
            response += `VALUE ${item.toString()} ${casUnique}\r\n`;
            response += `${item.data}\r\n`;
        });

        response += "END\r\n";

        return response;
    }
}

module.exports = RetrievalResponse;