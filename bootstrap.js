const { Framework } = require('@midwayjs/web');
const { createLogger, createConsoleLogger } = require('@midwayjs/logger');
const { Bootstrap } = require('@midwayjs/bootstrap');
const { join } = require('path');

// 一个只有控制台输出的日志
const consoleLogger = createConsoleLogger('customConsoleLogger');
// 文本日志
const fileLogger = createLogger('customFileLogger', {
    dir: join(__dirname, 'mlogs'),
});
const web = new Framework().configure({
    port: 7001,
    // logger: fileLogger,
});

Bootstrap.load(web).run();
