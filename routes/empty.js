const API = require('../api')
const request = require('request')
const CONF = require('../config')

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    router.get('*', (req, res) => {
        console.log('GET 빈거')
        res.setHeader('flag', CONF.ctf.empty.flag)
        res.send('<!--진짜로 없음-->')
    })
    return router;
}