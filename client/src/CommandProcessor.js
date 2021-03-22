/* eslint-disable max-len */
/* eslint-disable new-cap */
const CommandProcessor = () => {
  let rl;
  let memcachedClient;

  const setReadLine = (readlineModule) => {
    rl = readlineModule;
  };

  const setClient = (client) => {
    memcachedClient = client;
  };

  const processRetrievalCommand = (retrievalCommand, memcachedClient, callbackFn) => {
    rl.question('Key: ', (key) => {
      retrievalCommand.apply(memcachedClient, [key, callbackFn]);
    });
  };

  const processStorageCommand = (storageCommand, memcachedClient, callback) => {
    rl.question('Key: ', (key) => {
      rl.question('Data: ', (dataBlock) => {
        rl.question('Expiring time: ', (exptimeStr) => {
          let exptime;
          try {
            exptime = parseInt(exptimeStr);
          } catch (err) {
            throw new Error('exptime must be a number');
          }
          storageCommand.apply(memcachedClient,
              [key, dataBlock, exptime, callback]);
        });
      });
    });
  };

  const processStorageAddCommand = (storageCommand, memcachedClient, callback) => {
    rl.question('Key: ', (key) => {
      rl.question('Data: ', (dataBlock) => {
        storageCommand.apply(memcachedClient,
            [key, dataBlock, callback]);
      });
    });
  };

  const processCasCommand = (storageCommand, memcachedClient, callback) => {
    rl.question('Key to SET: ', (key) => {
      rl.question('Data: ', (dataBlock) => {
        rl.question('Expiring time: ', (exptimeStr) => {
          let exptime;
          try {
            exptime = parseInt(exptimeStr);
          } catch (err) {
            throw new Error('exptime must be a number');
          }

          rl.question('Cas unique: ', (casUniqueStr) => {
            try {
              parseInt(casUniqueStr);
            } catch (err) {
              throw new Error('cas unique must be a number');
            }
            storageCommand.apply(memcachedClient, [key, dataBlock,
              casUniqueStr, exptime, callback]);
          });
        });
      });
    });
  };

  const processGet = (callback) => {
    processRetrievalCommand(memcachedClient.get, memcachedClient, callback);
  };

  const processGets = (callback) => {
    processRetrievalCommand(memcachedClient.gets, memcachedClient, callback);
  };

  const processSet = (callback) => {
    processStorageCommand(memcachedClient.set, memcachedClient, callback);
  };

  const processAdd = (callback) => {
    processStorageCommand(memcachedClient.add, memcachedClient, callback);
  };

  const processReplace = (callback) => {
    processStorageCommand(memcachedClient.replace, memcachedClient, callback);
  };

  const processAppend = (callback) => {
    processStorageAddCommand(memcachedClient.append, memcachedClient, callback);
  };

  const processPrepend = (callback) => {
    processStorageAddCommand(memcachedClient.prepend, memcachedClient, callback);
  };

  const processCas = (callback) => {
    processCasCommand(memcachedClient.cas, memcachedClient, callback);
  };

  return {setReadLine, setClient, processGet, processGets, processAdd,
    processSet, processReplace, processAppend, processPrepend, processCas};
};


module.exports = CommandProcessor();
