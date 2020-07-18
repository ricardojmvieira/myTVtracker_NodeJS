const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

exports.createToken = (payload) => {//criar tokens
    return new Promise((resolve, reject) => {
        const options = { expiresIn: '8h', issuer: 'ti2Lessons' };
        jwt.sign(payload, key, options, (error, token) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve({ token, ...payload });
        });
    });
}; exports.validateToken = (token) => {//validar o token, verificar condições
    return new Promise((resolve, reject) => {
        let options = { issuer: 'ti2Lessons' };
        jwt.verify(token, key, options, (error, payload) => {
            if (error) reject(error);
            else resolve(payload);
        });
    });
};
