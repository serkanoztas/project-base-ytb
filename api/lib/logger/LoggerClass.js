const logger = require("./logger");
let instance = null;
class LoggerClass {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance
    }

    #createLogObject(emal, location, proc_type, log) {
        return {
            emal, location, proc_type, log
        }
    }

    info(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.info(logs);
    }
    warn(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.warn(logs);
    }
    error(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.error(logs);
    }
    debug(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.debug(logs);
    }
    verbose(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.verbose(logs);
    }
    http(emal, location, proc_type, log) {
        let logs = this.#createLogObject(emal, location, proc_type, log);
        logger.http(logs);
    }

}

module.exports = new LoggerClass();