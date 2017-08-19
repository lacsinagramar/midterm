var express = require('express');
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var routerMessage = express.Router();

routerMessage.use(authMiddleware.hasAuth);

routerMessage.get('/', (req,res)=>{
    var db = require('../../lib/database')();
    var queryString=`SELECT * FROM messages WHERE receiverName = "${req.session.user.Username}" GROUP BY senderName`;

    db.query(queryString, (err,results,fields) =>{
        if (err) return console.log(err);
        if(results.length===0) return res.render('userMessages/views/messages', {messagesForPug: results, noMessage: 1, reqQuery: req.query});
        res.render('userMessages/views/messages', {messagesForPug: results, noMessage: 0, reqQuery: req.query});
    });
});

routerMessage.get('/:sender', (req,res)=>{
    var db = require('../../lib/database')();
    var queryString=`SELECT * FROM messages WHERE (receiverName = "${req.session.user.Username}" AND senderName = "${req.params.sender}") OR (receiverName = "${req.params.sender}" AND senderName = "${req.session.user.Username}") ORDER BY sentTime ASC`;

    db.query(queryString, (err,results,fields) =>{
        if (err) return console.log(err);

        var kausaps;
        if (results[0].senderName === req.session.user.Username)
        {
            kausaps = results[0].receiverName
            res.render('userMessages/views/messageThread', {threadForPug: results, session: req.session.user.Username, keme: 0, kausap: kausaps});
        }
        else
            res.render('userMessages/views/messageThread', {threadForPug: results, session: req.session.user.Username, keme: 1});
    });
});

routerMessage.post('/send/:receiver', (req,res) =>{
    var db = require('../../lib/database')();
    var dateNow = new Date();
    dateNow = moment(dateNow).format('YYYY-MM-DD h:mm:ss');
    var queryString=`INSERT INTO messages(senderName, receiverName, messageContent, sentTime)
    VALUES ("${req.session.user.Username}", "${req.params.receiver}", "${req.body.messagecontent}", "${dateNow}")`;

    db.query(queryString, (err,results,fields)=>{
        if (err) return console.log(err);
        res.redirect(`/message/${req.params.receiver}`);
    });
});

routerMessage.post('/send/', (req,res) =>{
    var db2 = require('../../lib/database')();
    var queryString=`SELECT * FROM user WHERE Username="${req.body.receiver}"`;

    db2.query(queryString, (err,results,fields)=>{
        if (err) return console.log(err);
        if(results.length===0) return res.redirect('/message?userNotFound')
        {
            var db = require('../../lib/database')();
            var dateNow = new Date();
            dateNow = moment(dateNow).format('YYYY-MM-DD h:mm:ss');
            var queryString=`INSERT INTO messages(senderName, receiverName, messageContent, sentTime)
            VALUES ("${req.session.user.Username}", "${req.body.receiver}", "${req.body.messagecontent}", "${dateNow}")`;

            db.query(queryString, (err,results,fields)=>{
                if (err) return console.log(err);
                res.redirect(`/message`);
        });
        }
    })
})
exports.message = routerMessage;