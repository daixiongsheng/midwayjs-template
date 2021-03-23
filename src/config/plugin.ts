import { EggPlugin } from 'egg';

export default {
    logrotator: false, // disable when use @midwayjs/logger
    static: false,
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    sessionRedis: {
        enable: true,
        package: 'egg-session-redis',
    },
} as EggPlugin;
