const jwt = require('../helpers/jwt.js');

//se isto tudo der certo na autenticação então prossegue o pedido para controller
module.exports = (...roles) => {
    return (req, res, next) => {
        if (req.headers.authorization) {//verificar se existe algum valor no header de autorização
            //ou seja vê se está autenticado
            jwt.validateToken(req.headers.authorization)//se exister temos um token e validar o token com sucesso 
                .then((payload) => {//retorna o token
                    if (roles.length > 0 && !roles.some((r) => r == payload.role)) {//se forem defenidos roles e ele não está dentro dos roles
                        res.status(401).send('Not allowed');
                    } else {
                        //ele está dentro dos roles
                        req.client = payload._id;//meter o id do utilizador e regista-lo no pedido
                        next();//proseguir o pedido
                    }
                })
                .catch((error) => res.status(401).send(error.message));
        } else return res.status(401).send('Authorization header undefined');
    };
};
