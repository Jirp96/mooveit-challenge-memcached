# Description
It complies with the requiremets set by the [coding challenge](https://github.com/moove-it/coding-challenges/blob/master/node-js.md), detailed below:


## Requirements

A subset of Memcached commands, with all of their allowed options, must be supported.

### Retrieval commands:
- get
- gets

### Storage commands:
- set
- add
- replace
- append
- prepend
- cas

Each command has a set of unit tests covering each of their cases.

## Purging of expired keys
- Every time an expired key is accessed, it's deleted
- For the case that a key expired but it has never been accessed again, there's a Scheduled Job(via [node-cron](https://www.npmjs.com/package/node-cron)), that runs everyday at 00:00 and it checks all the keys to know if they expired.
 
### Note
- In a real-world scenario i'd recommend against having this job running in the same instance as the memcached server, as it would affect performance(it's set to run in an arbitrary "low stress hour", and it runs daily assuming worst case scenario that expired keys accumulate too fast).
- An alternative would be to have a job that enqueues all keys and workers/consumers that checks them at a controlled throughtput(maybe with [RabbitMQ](https://github.com/squaremo/amqp.node))

***
# How to Run
## Server
From the root folder of the project:
```
cd server
npm install
node .\src\index.js
```

## Test app
From the root folder of the project:
```
cd client
npm install
node .\src\index.js
```

# How to Test
From the root folder of the project:
```
cd server
npm test
```

# Load Testing
## Modules Used
- [Artillery.io](https://artillery.io/)
- [Artillery-Engine-TCP](https://github.com/limiter121/artillery-engine-tcp)

### Installing
Artillery-Engine-TCP is used to create Artillery scenarios that communicate with the TCP sockets used in the memcached server.
```
npm install -g artillery
npm install -g artillery-engine-tcp
```

## Running the load test
From the root folder of the project:
```
cd server
artillery run artillery_test.yml -o load_test_results.json
```