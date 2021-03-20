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

  const processRetrievalCommand = (retrievalCommand) => {
    rl.question('Key: ', (key) => {
      retrievalCommand.apply(memcachedClient, [key, processRetrievalResponse]);
    });
  };

  const processStorageCommand = (storageCommand, memcachedClient) => {
    rl.question('Key to SET: ', (key) => {
      rl.question('Data: ', (dataBlock) => {
        rl.question('Expiring time: ', (exptime) => {
          storageCommand.apply(memcachedClient,
              [key, dataBlock, parseInt(exptime), processStorageResponse]);
        });
      });
    });
  };

  const processStorageResponse = (err) => {
    if (err) {
      console.log('There was an error with the command: ' + err.message);
    } else {
      console.log('Success!');
    }
  };

  const processRetrievalResponse = (err, data) => {
    if (err) {
      console.log(err);
    } else if (data) {
      Object.keys(data).forEach((key) => {
        console.log(`${key}: ${data[key]}`);
      });
    } else {
      console.log('Empty response');
    }
  };

  const processCas = (storageCommand, memcachedClient) => {
    rl.question('Key to SET: ', (key) => {
      rl.question('Data: ', (dataBlock) => {
        rl.question('Expiring time: ', (exptime) => {
          rl.question('Cas unique: ', (casUnique) => {
            storageCommand.apply(memcachedClient, [key, dataBlock, 
              parseInt(exptime), parseInt(casUnique), processStorageResponse]);
          });
        });
      });
    });
  };

  const processGet = () => {
    processRetrievalCommand(memcachedClient.get, memcachedClient);
  };

  const processGets = () => {
    processRetrievalCommand(memcachedClient.gets, memcachedClient);
  };

  const processSet = () => {
    processStorageCommand(memcachedClient.set, memcachedClient);
  };

  const processAdd = () => {
    processStorageCommand(memcachedClient.add, memcachedClient);
  };

  const processReplace = () => {
    processStorageCommand(memcachedClient.replace, memcachedClient);
  };

  const processAppend = () => {
    processStorageCommand(memcachedClient.append, memcachedClient);
  };

  const processPrepend = () => {
    processStorageCommand(memcachedClient.prepend, memcachedClient);
  };


  return {setReadLine, setClient, processGet, processGets, processAdd,
    processSet, processReplace, processAppend, processPrepend, processCas};
};


module.exports = CommandProcessor();
