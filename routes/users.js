var express = require('express');
var router = express.Router();
let connection = require('../config/db');
let jwt = require('jsonwebtoken');
let secret = 'Ser'
    /* localhost:3000/users*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/* localhost:3000/users/login  */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* localhost:3000/users/login  */
router.post('/login', function(req, res, next) {
    //recojo los campos del login del usuario
    const { email, password } = req.body;
    //creo la query y compruebo que ese usuario existe
    let sql = `SELECT * FROM user WHERE email = '${email}' AND password= '${password}'`;

    connection.query(sql, (err, result) => {
        console.log(result)
        if (err) throw err;
        const token = jwt.sign({ result }, secret, {
            expiresIn: 60 * 60 * 24
        });
        console.log(token)
        res.render('newView')

    })


});

router.get('/private', (req, res) => {

    const token = req.header('token12');

    if (!token) {
        res.send('no existe token y no puedes entrar');
    }
    const decoded = jwt.verify(token, secret)

    res.json(decoded)

})

module.exports = router;