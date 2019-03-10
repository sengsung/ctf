const API = require('../api')
const request = require('request')
const CONF = require('../config')

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    router.use((req, res, next) => {
        console.log(req.cookies)
        if(!req.cookies.user2)
            res.cookie('user2', '0')
        next()
    })

    router.get('/', async function(req, res){
        console.log('GET sboard/')
        var rows = await API.Board_Second.findAll()
        res.render('sboard/index', {list:rows})
    });

    router.get('/post', async (req, res) => {
        console.log('GET sboard/post')
        res.render('sboard/post')
    })

    router.post('/post', async (req, res) => {
        console.log('POST sboard/post')
        var result = await API.Board_Second.create({
            user:       req.body.user,
            title:      req.body.title,
            content:    req.body.content
        })
        request({
            url : `http://ctf.fishsoup.kr:7000/sboard/view/${result.get('id')}`,
            method: 'get',
            headers: {
                'Cookie': `user2=${CONF.ctf.sboard.admin_cookie}`
            }
        }, (err, res, body) => {
            if (err) {
                console.err(err)
            }
        })
        res.redirect('/sboard')
    })

    router.get('/view/:id', async (req, res) => {
        console.log('GET sboard/view/' + req.params.id)
        try {
            res.send((await API.Board_Second.findOne({where:{id:req.params.id}})).content)
        } catch (err) {
            res.redirect('/sboard')
        }
        
    })

    router.get('/admin', (req, res) => {
        console.log('GET sboard/admin')
        if(req.cookies.user2 == CONF.ctf.sboard.admin_cookie)
            res.send(CONF.ctf.sboard.flag)
        else
            res.send('관리자만 접속할 수 있습니다!')
    })
    return router;
}