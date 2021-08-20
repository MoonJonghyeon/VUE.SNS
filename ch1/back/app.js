const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const cookie = require('cookie-parser')
const morgan = require('morgan')

const db = require('./models')
const passportConfig = require('./passport');
const user = require('./models/user');
const app = express();

db.sequelize.sync({ force: true });
passportConfig();

app.use(morgan('dev'))
app.use(cors('http://localhost:3000'))
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookie('cookieSecret'))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookieSecret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.status(200).send('hello backend')
})

app.post('/user', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12)
        const exUser = await db.User.findOne({
            email: req.body.email,
        })
        if(exUser) {
            return res.status(400).json({
                errorCode: 1,
                message: 'already signedup email',
            })
        }
        const newUser = await db.User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash,
        })
        return res.status(201).json(newUser);
    } catch (err) {
        console.log(err)
        return next(err)
    }
    
})

app.post('/user/login', async (req, res) => {
    req.body.email;
    req.body.password;
    await db.User.findOne();
    user[cookie] = userinformation;
})

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`)
})