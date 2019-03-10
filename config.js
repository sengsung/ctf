var config = {
    db: {
        host: '127.0.0.1',
        port: '3306',
        database: 'ctf',
        user: 'root',
        password: 'sengsung'
    },

    server: {
        host: '127.0.0.1',
        port: {
            http: 7000,
            https: 7001,
            socket: 7002
        },
        ssl: {
            use: true,
            key: './ssl/privkey.pem',
            cert: './ssl/cert.pem'
        },
        host_url: 'bot.fishsoup.kr:8001'
    },

    ctf: {
        fboard: {
            flag: "FLAG{I'm_very_hungry..}",
            admin_cookie: '48gQ$Hifh2siwG$9bre'
        },
        sboard: {
            flag: "FLAG{YayaAYAyaYAyAYAYA}",
            admin_cookie: 'ikafeejg4#WG%ijf23'
        },
        empty: {
            flag: "FLAG{I'm_very_hungry_too!!}"
        },
        empty2: {
            flag: "FLAG{Good_Bye_Trust_I'll_Miss_You}"
        }
    },

    admin_pass: 'sksWhd2',
    host: 'ctf.fishsoup.kr'
}

module.exports = config