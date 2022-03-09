const userService = require('../services/user-service.js');//importar serviços
const jwt = require('../helpers/jwt.js');

exports.register = (req, res) => {//chamar o serviço de utilizador e fazer o resgisto
    userService
        .register(req.body.username, req.body.password, req.body.role)//criar registo
        .then((data) => res.json(data))
        .catch((message) => res.status(500).send(message));
};
exports.login = (req, res) => {//iniciar sessão
    userService
        .authenticate(req.body.username, req.body.password)//mandar o utilizador e password
        .then((payload) => jwt.createToken(payload))//se for bem sucedido é retornado o id e role do user para criar token
        .then((data) => res.json(data))//se o token for criado recebemos o dados que pretendemos enviar para o cliente(dados do jwt)
        .catch((error) => res.status(500).send(error.message));
};