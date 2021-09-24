const passport = require('passport')
const bcrypt = require('bcrypt')
const db = require('../models')
const { Strategy: LocalStrategy } = require('passport-local')

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const exUser = await db.User.findOne({ where : { email } })
            if(!exUser) {
                return done(null, false, {reason : 'no existing email'})
            }
            const result = await bcrypt.compare(password, exUser.password)
            if(result) {
                return done(null, exUser);
            } else {
                return done(null, false, {reason: 'wrong password'})
            }
        } catch {
            console.error(err);
            return done(err)
        }
    }))
}