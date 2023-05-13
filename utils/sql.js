const mysql = require('mysql2')
const config = require('../config')
const console = require('./console')
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

const task = 'DATABASE'

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(task,'\033[32mDATABASE CONNECT SERVER\033[32m')
    }
})

module.exports = connection
    