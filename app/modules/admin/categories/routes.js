var router = require('express').Router();
var db = require('../../../lib/database')();

router.get('/', (req, res) => {
    db.query(`SELECT * FROM post_category`, (err, results, fields) => {
        return res.render('admin/categories/views/index', { categories: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`post_category\` (\`CategoryName\`)
    VALUES("${req.body.categoryname}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/categories/views/form');
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM post_category WHERE ID=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/categories/views/form', { category: results[0] });
    });
});

router.put('/:id', (req, res) => {
    console.log(req.body);
    const queryString = `UPDATE post_category SET
    post_category.CategoryName = "${req.body.categoryname}"
    WHERE post_category.ID=${req.params.id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/categories');
    });
});


module.exports = router;