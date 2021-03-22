/* eslint-disable require-jsdoc */
const constants = require('../constants');
const Response = require('./Response');

class ErrorResponse extends Response {
    message = '';

    constructor(type, message) {
      super(type);
      this.message = message;
    }

    toString() {
      if ( this.type === constants.RESPONSE_TYPES.ERROR ) {
        return `${this.type}\r\n`;
      }
      return `${this.type} ${this.message}\r\n`;
    }
}

module.exports = ErrorResponse;
