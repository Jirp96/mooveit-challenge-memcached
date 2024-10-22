module.exports = {
  LF_ASCII: 13,
  CR_ASCII: 10,
  CRLF_CHAR: '\r\n',
  TOKEN_SEPARATOR: ' ',
  MAX_EXPTIME_SECONDS: 60*60*24*30,
  NO_REPLY: 'noreply',
  COMMANDS: {
    'GET': 'GET',
    'GETS': 'GETS',
    'SET': 'SET',
    'ADD': 'ADD',
    'REPLACE': 'REPLACE',
    'APPEND': 'APPEND',
    'PREPEND': 'PREPEND',
    'CAS': 'CAS',
  },
  MIN_STORAGE_COMMAND_LENGTH: 5,
  MIN_CAS_COMMAND_LENGTH: 6,
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
  },
  COMMAND_TYPES: {
    'RETRIEVAL': 'RETRIEVAL',
    'STORAGE': 'STORAGE',
    'OTHER': 'OTHER',
  },
};
