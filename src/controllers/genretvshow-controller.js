const genretvshowService = require('../services/genretvshow-service.js');

exports.getGenreTvshows = (req, res) => {
    genretvshowService
        .getGenreTvshows()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.insertGenreTvshow = (req, res) => {
    genretvshowService
        .insertGenreTvshow(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.removeGenreTvshow = (req, res) => {
    genretvshowService
        .removeGenreTvshow(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};