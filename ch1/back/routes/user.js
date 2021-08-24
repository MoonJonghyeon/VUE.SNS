const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const db = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.user;
    res.json(user)
})

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12)
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(exUser) {
            return res.status(403).json({
                errorCode: 1,
                message: 'already signedup email',
            })
        }
        await db.User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash,
        })
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                console.error(err)
                return next(err)
            }
            if(info) {
                return res.status(401).send(info.reason)
            }
            return req.login(user, async (err) => {
                if(err) {
                    console.error(err);
                    return next(err)
                }
                return res.json(user)
            })
        })(req, res, next);
    } catch (err) {
        console.log(err)
        return next(err)
    }
    
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err)
            return next(err)
        }
        if(info) {
            return res.status(401).send(info.reason)
        }
        return req.login(user, async (err) => {
            if(err) {
                console.error(err);
                return next(err)
            }
            return res.json(user)
        })
    })(req, res, next)
})

router.post('/logout', isLoggedIn, (req, res) => { // 실제 주소는 /user/logout
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy(); // 선택사항
      return res.status(200).send('로그아웃 되었습니다.');
    }
  });

module.exports = router;