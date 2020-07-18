const genretvshowController = require('../controllers/genretvshow-controller.js');
const router = require('express').Router();
const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//tem de estar autenticado e pertencer a este role
router.get('', authorize(roles.Admin), genretvshowController.getGenreTvshows);
router.post('', authorize(roles.Admin), genretvshowController.insertGenreTvshow);
router.delete('/:id', authorize(roles.Admin), genretvshowController.removeGenreTvshow);

module.exports = router;