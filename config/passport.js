const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./key');
const db = require('../config/database');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        var sql = "SELECT * FROM Users WHERE id='"+jwt_payload.id+"'";
        db.query(sql, 
        function (err, [user]) {
            console.log(user);
            return done(null, user);
        });
    }));
}