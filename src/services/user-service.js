const db = require("../configs/mongodb").getDB();
const cipher = require("../helpers/cipher");
const roles = require("../helpers/roles");
const ObjectId = require("mongodb").ObjectID;

exports.register = (username, rawPassword, role) => {
    return new Promise((resolve, reject) => {
        try {
            db.collection('users').findOne({ username: username }).then((found) => {//ver se ja existe este user name
                if (!found) {//se não existir este user name
                    if (Object.values(roles).indexOf(role) > -1) {//se no objeto dos roles existe algum role com o valor mandado por parametro
                        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                            const dataIv = cipher.generateIv();//criar vetor de inicialização para este utilizador
                            const password = cipher.encrypt(rawPassword, dataIv);//cifar a password com o vetor de inicialização
                                db.collection('users').insertOne({ username, password, role, dataIv, tvshows: [] })//inserir o utilizador na db
                                    .then((res) => resolve(res))
                                    .catch((error) => reject(error.message));
                        } else reject('invalid password');
                    } else reject('invalid role');
                } else reject('username already in use');
            }).catch((error) => reject(error.message));
        } catch (error) { reject(error.message); }
    });
};

exports.authenticate = (username, rawPassword) => {
    return new Promise((resolve, reject) => {
        db.collection('users')
            .findOne({ username: username })//encontrar um  utilizador com este username
            .then((user) => {//se encontrar é retornado
                if (user) {//se existir 
                    const password = cipher.decrypt(user.password, user.dataIv);//decifra a password da db com o vetor de inicialização que ja está na db
                    if (password == rawPassword) resolve({ _id: user._id, role: user.role });//comparar com aquela que esta na db e da resolve da informação para o token
                }
                reject(new Error("username and password don't match"));
            })
            .catch((error) => reject(error));
    });
};

