const { format, createLogger, transports } = require("winston");
const { LOG_LEVEL } = require("../../config");

const formats = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SS" }),
    format.simple(),//format string olacak
    format.splat(),
    format.printf(info => {
        const log = typeof info.message.log == "object" ? JSON.stringify(info.message.log, null, 2) : info.message.log;

        return `${info.timestamp} ${info.level.toUpperCase()}: [email: ${info.message.email}] [location: ${info.message.location}] [procType: ${info.message.proc_type}] [log: ${log}]`
    })
);

const logger = createLogger({
    level: LOG_LEVEL,
    transports: [new (transports.Console)({ format: formats })]
});

module.exports = logger;