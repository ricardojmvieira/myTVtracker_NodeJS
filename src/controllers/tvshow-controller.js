const tvshowService = require('../services/tvshow-mongodb.js');

exports.getTvshows = (req, res) => {
    tvshowService
        .getTvshows()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.getTvshow = (req, res) => {
    tvshowService
        .getTvshow(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.insertTvshow = (req, res) => {
    tvshowService
        .insertTvshow(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.updateTvshow = (req, res) => {
    tvshowService
        .updateTvshow(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.removeTvshow = (req, res) => {
    tvshowService
        .removeTvshow(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};