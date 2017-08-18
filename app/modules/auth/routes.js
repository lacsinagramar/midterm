var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var signUpRouter = express.Router();

var authMiddleware = require('./middlewares/auth');

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM user WHERE email="${req.body.email}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');

            var user = results[0];

            if (user.password !== req.body.password) return res.redirect('/login?incorrect');

            delete user.password;

            req.session.user = user;

            return res.redirect('/index');
        });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

signUpRouter.post('/', (req,res) =>{
    var db = require('../../lib/database')();

    db.query(`SELECT * FROM user WHERE Username="${req.body.username}"`, (err, results, fields) =>{
        if(err) throw err;
        if(results.length !== 0) return res.redirect('/login?usernameExists');

        var db2 = require('../../lib/database')();
        var queryString = `INSERT INTO \`user\` (\`Username\`, \`password\`, \`email\`, \`birthday\` ,\`userType\`)
        VALUES("${req.body.name}", "${req.body.password}", "${req.body.email}", "${req.body.birthday}", "Normal")`;
        db2.query(queryString, (err, results, fields) => {
            if (err) throw err;
            return res.redirect('/login?success');
        });

    });
});

exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = signUpRouter;