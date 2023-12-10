const { 
    info, error
} = require('../utils/messageLogger');

const requestLogger = (req, res, next) => {
    info(`METHOD: ${req.method}`);
    info(`TIME: ${new Date()}`);
    info(`PATH: ${req.hostname + req.url}`);
    next();
}

module.exports = requestLogger;