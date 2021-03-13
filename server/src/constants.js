module.exports = {
    LF_ASCII: 13,
    CR_ASCII: 10,
    TOKEN_SEPARATOR: ' ',
    MAX_EXPTIME_SECONDS: 60*60*24*30,
    COMMANDS: { 
        'GET': 'GET',
        'GETS': 'GETS',
        'SET': 'SET',
        'ADD': 'ADD',
    },
    MIN_STORAGE_COMMAND_LENGTH: 5,
    MIN_RETRIEVAL_COMMAND_LENGTH: 2,
    RESPONSE_TYPES: {
        'ERROR': 'ERROR',
        'CLIENT_ERROR': 'CLIENT_ERROR',
        'SERVER_ERROR': 'SERVER_ERROR',
        'STORED': 'STORED',
        'NOT_STORED': 'NOT_STORED',
        'EXISTS': 'EXISTS',
        'NOT_FOUND': 'NOT_FOUND',
        'RETRIEVAL_SUCCESS': 'RETRIEVAL_SUCCESS',
    }
}