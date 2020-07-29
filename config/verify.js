let jwt = require('jsonwebtoken');
let secret = 'secret';
function verify(req, res, next) {
    
    const token = req.header('token1');
    
    if (!token) {
        res.send('noo exite el token');
    };
    
    const decoded = jwt.verify(token, secret);
    console.log('PASA POR EL ARCHIVO VERIFY.JS');
    next();
}
module.exports = verify;