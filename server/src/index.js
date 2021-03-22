#!/usr/bin/env node
/* eslint-disable max-len */

const net = require('net');
const cron = require('node-cron');

const config = require('./config');
const serverListener = require('./serverListener');
const expiredKeysPurgerJob = require('./jobs/expiredKeysPurgerJob');

const server = net.createServer(serverListener.listener);

server.listen(config.PORT, config.IP);

cron.schedule(config.KEY_PURGER_JOB_CRON_SCHEDULE, expiredKeysPurgerJob.run);