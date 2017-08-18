
var express = require('express');
var moment = require('moment');

var routerForCategory = express.Router();
var routerForPost = express.Router();

var authMiddleware = require('../auth/middlewares/auth');

routerForCategory.use(authMiddleware.hasAuth);
routerForPost.use(authMiddleware.hasAuth);

routerForCategory.get('/:id', (req, res)=>{
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM \`post\` JOIN \`post_category\` ON post.postCategoryCode = post_category.ID WHERE post.postCategoryCode = ? AND post.isDeleted != '1'`,[req.params.id], function (err, results, fields) {
        if (err) return res.send(err);
        if (results.length===0)
        {
            console.log('wala posts');
            var db2 = require('../../lib/database')();
            var queryString = `SELECT * FROM post_category WHERE ID = ${req.params.id}`;
            db.query(queryString, (err,results,fields)=>{
                if (err) return console.log(err);
                res.render('categoriesAndPosts/views/postsOnCategory', { postsForPug: posts, noPosts: 1 });
            });
        }
        else
        {
            console.log('meron posts')
            render(results);
        }
    });

    function render(posts) {
        res.render('categoriesAndPosts/views/postsOnCategory', { postsForPug: posts });
    }
});

routerForPost.get('/:id', (req,res)=>{
    var db = require('../../lib/database')();
    var date;
    db.query(`SELECT * FROM post JOIN comment ON post.postID=comment.postCode WHERE post.postID = ?`,[req.params.id], function (err, results, fields) {
        if (err) return res.send(err);
        if (results.length===0)
        {
            console.log('wala comment');
            var db2 = require('../../lib/database')();
            var queryString = `SELECT * FROM post WHERE postID = ${req.params.id}`
            db.query(queryString, (err,results,fields)=>{
                 results[0].postDate = moment(results[0].postDate).format('MMM Do YYYY');
                if (results[0].author === req.session.user.Username)
                {
                    renderOwner(results);
                }
                else
                {
                    render(results);
                }
            });
        }
        else
        {
            console.log('meron comment');
            results[0].postDate = moment(results[0].postDate).format('MMM Do YYYY');
            if (results[0].author === req.session.user.Username)
            {
                renderOwner(results);
            }
            else
            {
                render(results);
            }
        }
        
    });

    function render(content) {
        res.render('categoriesAndPosts/views/postContent', { contentForPug: content });
    }
    function renderOwner(content) {
        res.render('categoriesAndPosts/views/postContentOwner', { contentForPug: content });
    }
});

routerForPost.post('/on-:id', (req,res)=>{
    var dateNow = new Date();
    dateNow = moment(dateNow).format('YYYY-MM-DD');
    var db = require('../../lib/database')();
    db.query(`INSERT INTO post (author, postCategoryCode, postSubject, postContent, postDate) VALUES ("${req.session.user.Username}", ${req.params.id}, "${req.body.postsubject}", "${req.body.postcontent}", "${dateNow}")`, (err, results, fields) =>{
        if (err) console.log(err);
        res.redirect('/category/'+[req.params.id]);
    });
});

routerForPost.post('/edit/:id', (req,res)=>{
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM post WHERE postID = ?`,[req.params.id], function (err, results, fields) {
        if (err) return res.send(err);
        results[0].postDate = moment(results[0].postDate).format('MMM Do YYYY');
        render(results);
    });

    function render(content) {
        res.render('categoriesAndPosts/views/editPost', { contentForPug: content });
    }
});

routerForPost.post('/edited', (req,res)=>{
    var db = require('../../lib/database')();
    console.log(req.body);
    db.query(`UPDATE post SET post.postContent = ? WHERE post.postID = ?`,[req.body.postcontent, Number(req.body.id)], function (err, results, fields) {
        if (err) return res.send(err);
    });
    res.redirect('/post/'+req.body.id);
});

routerForPost.post('/delete/:id', (req,res)=>{
    var db = require('../../lib/database')();
    console.log(req.body);
    db.query(`UPDATE post SET post.isDeleted = '1' WHERE post.postID = ?`,[Number(req.params.id)], function (err, results, fields) {
        if (err) return res.send(err);
    });
    res.redirect('/category/'+req.body.category);
<<<<<<< HEAD
=======
});

routerForPost.post('/:id/comment', (req,res)=>{
    console.log(req.params.id)
    var db = require('../../lib/database')();
    var queryString = `INSERT INTO comment VALUES(${req.params.id}, "${req.body.kumment}", "${req.session.user.Username}")`;

    db.query(queryString, (err,results,fields) =>{
        if(err) return console.log(err)
            res.redirect(`/post/${req.params.id}`)
    });
>>>>>>> gramar
});

exports.category = routerForCategory;
exports.post = routerForPost;