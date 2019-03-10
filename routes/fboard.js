const API = require('../api')
const request = require('request')
const CONF = require('../config')

module.exports = function(app){
    var express = require('express');
    var router = express.Router();

    router.use((req, res, next) => {
        console.log(req.cookies)
        if(!req.cookies.user)
            res.cookie('user', '0')
        next()
    })

    router.get('/', async function(req, res){
        console.log('GET fboard/')
        var rows = await API.Board_First.findAll()
        res.render('fboard/index', {list:rows})
    });

    router.get('/post', async (req, res) => {
        console.log('GET fboard/post')
        res.render('fboard/post')
    })

    router.post('/post', async (req, res) => {
        console.log('POST fboard/post')
        var result = await API.Board_First.create({
            user:       req.body.user,
            title:      req.body.title,
            content:    req.body.content
        })
        request({
            url : `http://ctf.fishsoup.kr:7000/fboard/view/${result.get('id')}`,
            method: 'get',
            headers: {
                'Cookie': `user=${CONF.ctf.fboard.admin_cookie}`
            }
        }, (err, res, body) => {
            if (err) {
                console.err(err)
            }
            console.log(body)
        })
        res.redirect('/fboard')
    })

    router.get('/view/:id', async (req, res) => {
        console.log('GET fboard/view/' + req.params.id)
        try {
            res.send((await API.Board_First.findOne({where:{id:req.params.id}})).content)
        } catch (err) {
            res.redirect('/fboard')
        }
        
    })

    router.get('/admin', (req, res) => {
        console.log('GET fboard/admin')
        if(req.cookies.user == CONF.ctf.fboard.admin_cookie)
            res.send(CONF.ctf.fboard.flag)
        else
            res.send('관리자만 접속할 수 있습니다!')
    })
    return router;
}