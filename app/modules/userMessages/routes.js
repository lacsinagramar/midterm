var express = require('express');
var moment = require('moment');
var authMiddleware = require('../auth/middlewares/auth');
var routerMessage = express.Router();

routerMessage.get('/', (req,res)=>{
    var db = require('../../lib/database')();
    queryString=`SELECT * FROM messages WHERE receiverName = ${req.session.user.Username}`;

    db.query(queryString, (err,results,fields) =>{
        if (err) return console.log(err);
        if(results.length===0) return res.render('userMessages/views/messages', {messagesForPug: results, noMessage: 1});
        res.render('userMessages/views/messages', {messagesForPug: results, noMessage: 0});
    });
});

exports.message = routerMessage;