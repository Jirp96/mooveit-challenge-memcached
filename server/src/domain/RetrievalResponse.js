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
            response += `VALUE ${item.toString()} ${item.casUnique}\r\n`;
            response += `${item.data}\r\n`;
        });

        response += "END\r\n";

        return response;
    }
}

module.exports = RetrievalResponse;