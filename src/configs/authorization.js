const jwt = require('../helpers/jwt.js');

//se isto tudo der certo na nossa autenticação então prosegue o pedido para controller
module.exports = (...roles) => {
    return (req, res, next) => {
        if (req.headers.authorization) {//verificar se existe algum valor no nosso headr de autorização
            jwt.validateToken(req.headers.authorization)//se exister temos um token e validar o token com sucesso
                .then((payload) => {//retorna o token
                    if (roles.some((r) => r == payload.role)) {//se o ...roles tiver o role de acesso
                        req.client = payload._id;//meter o id do utilizador e regista-lo no pedido
                        next();//proseguir o pedido
                    } else res.status(401).send('Not allowed');
                }).catch((error) => res.status(401).send(error.message));
        } else return res.status(401).send('Authorization header undefined');
    };
};
