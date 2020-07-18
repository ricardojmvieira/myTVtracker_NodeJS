const tvshowController = require('../controllers/tvshow-controller.js');
const router = require('express').Router();
const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//tem de estar autenticado
router.get('', authorize(), tvshowController.getTvshows);
router.get('/:id', authorize(), tvshowController.getTvshow);
//tem de estar autenticado e pertencer a este role
router.post('', authorize(roles.Admin), tvshowController.insertTvshow);
router.put('/:id', authorize(roles.Admin), tvshowController.updateTvshow);
router.delete('/:id', authorize(roles.Admin), tvshowController.removeTvshow);

module.exports = router;