class Response {
    type = "";

    constructor(type){
        this.type = type;
    }

    toString(){
        return `${this.type}\r\n`;
    }
}

module.exports = Response;