var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');

var CONF = require('./config')

var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server)

//----------SOCKET-----------
io.on('connection', (socket) => {
    socket.on('empty2', (data) => {
        console.log('empty2소켓참여')
        socket.join('empty2')
    })
})

var empty_data = ['Hello', 'Im', 'FishSoup', 'Nice', 'to', 'meet', 'you', 'and', 'you?', 'aaaaaaaaah', 'simsimhae', CONF.ctf.empty2.flag]
var empty_cnt = 0
setInterval(() => {
    io.to('empty2').emit('xdhsss', {
        data:empty_data[empty_cnt++]
    })
    if (empty_cnt >= empty_data.length)
        empty_cnt = 0
},500)
//--------------------------
app.locals.pretty = true;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secure:true,
    secret:'password',
    resave: false,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(require('cors')())

app.use((req, res, next) => {
    console.log('---------')
    console.log(new Date())
    console.log(req.ip)
    next()
})
//라우팅
app.get('/test', (req, res)=>{
    console.log('-----쿠키테스트-----')
    console.log(req.cookies)
    res.send(req.cookies)
})
app.get('/404', (req, res) => {
    res.send(404)
})
app.use('/fboard', require('./routes/fboard.js')(app));
app.use('/sboard', require('./routes/sboard.js')(app));
app.use('/empty', require('./routes/empty.js')(app));

server.listen(CONF.server.port.http, function(){
    console.log('서버시작')
});
