class Response {
    type = "";

    constructor(type, message){
        this.type = type;
    }

    toString(){
        return `${this.type}\r\n`;
    }
}

module.exports = Response;