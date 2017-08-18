var router = require('express').Router();
var db = require('../../../lib/database')();
var moment = require('moment');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM user WHERE (ID != 0 AND isDeleted !='1')`, (err, results, fields) => {
        return res.render('admin/users/views/index', { users: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`user\` (\`Username\`, \`password\`, \`email\`, \`birthday\` ,\`userType\`)
    VALUES("${req.body.name}", "${req.body.password}", "${req.body.email}", "${req.body.birthday}", "Normal")`;
    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/users');
    });
});

router.get('/new', (req, res) => {
    res.render('admin/users/views/form');
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM user WHERE ID=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        results[0].birthday = moment(results[0].birthday).format('YYYY-MM-DD');
        res.render('admin/users/views/form', { user: results[0] });
    });
});

router.put('/:id', (req, res) => {
    console.log(req.body);
    const queryString = `UPDATE user SET
    user.Username = "${req.body.name}",
    user.email = "${req.body.email}",
    user.birthday ="${req.body.birthday}"
    WHERE user.ID=${req.params.id}`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

router.get('/:id/remove', (req, res) => {
    db.query(`UPDATE user SET user.isDeleted = '1' WHERE ID=${req.params.id}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

module.exports = router;