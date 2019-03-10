const Sequelize = require('sequelize')

const CONF = require('../config.js')

const API = new Sequelize(CONF.db.database, CONF.db.user, CONF.db.password, {
    host: CONF.db.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
	timezone: '+09:00'
})

API.Board_First = API.define('board_first', {
    id: { type: Sequelize.INTEGER(10).UNSIGNED , primaryKey: true, autoIncrement: true },
    user: Sequelize.TEXT,
    title: Sequelize.TEXT,
    content: Sequelize.TEXT
})

API.Board_Second = API.define('board_second', {
    id: { type: Sequelize.INTEGER(10).UNSIGNED , primaryKey: true, autoIncrement: true },
    user: Sequelize.TEXT,
    title: Sequelize.TEXT,
    content: Sequelize.TEXT
})

API.sync()

module.exports = API