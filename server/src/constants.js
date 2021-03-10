module.exports = {
    LF_ASCII: 13,
    CR_ASCII: 10,
    TOKEN_SEPARATOR: ' ',
    MAX_EXPTIME_SECONDS: 60*60*24*30,
    COMMANDS: { 
        'GET': 'get',
        'GETS': 'gets',
        'SET': 'set',
        'ADD': 'add',
    },
    MIN_STORAGE_COMMAND_LENGTH: 5,
    RESPONSE_TYPES: {
        'ERROR': 'ERROR',
        'CLIENT_ERROR': 'CLIENT_ERROR',
        'SERVER_ERROR': 'SERVER_ERROR',
        'STORED': 'STORED',
        'NOT_STORED': 'NOT_STORED',
        'EXISTS': 'EXISTS',
        'NOT_FOUND': 'NOT_FOUND'
    }
}