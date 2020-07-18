const crypto = require('crypto');//importar biblioteca
const key = process.env.CIPHER_KEY;//chave para decifrar texto

exports.generateIv = () => {
    return crypto.randomBytes(8).toString('hex');
};
exports.encrypt = (data, iv) => {//encriptar
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return cipher.update(Buffer.from(data), 'utf8', 'hex') + cipher.final('hex');
};
exports.decrypt = (data, iv) => {//decifrar
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
};
