const mytvshowService = require('../services/mytvshow-service.js');

exports.getMyTvshows = (req, res) => {
    mytvshowService
        .getMyTvshows(req.client)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.getMyTvshow = (req, res) => {
    mytvshowService
        .getMyTvshow(req.params.id, req.client)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.insertMyTvshow = (req, res) => {
    mytvshowService
        .insertMyTvshow(req.params.id, req.client)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.updateMyTvshow = (req, res) => {
    mytvshowService
        .updateMyTvshow(req.params.id, req.body, req.client)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
exports.removeMyTvshow = (req, res) => {
    mytvshowService
        .removeMyTvshow(req.params.id, req.client)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};