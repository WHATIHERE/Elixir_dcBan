consoleCustom = exports = module.exports = {};

consoleCustom.log = function(task, message) {
    console.info(`[${new Date().toLocaleString()}] [${task}] ${message}`)
}