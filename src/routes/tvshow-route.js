const router = require('express').Router();
const tvshowController = require('../controllers/tvshow-controller.js');

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

router.get('', authorize(roles.Boss, roles.Servent), tvshowController.getTvshows);
router.get('/:id', authorize(roles.Boss, roles.Servent), tvshowController.getTvshow);
router.post('', authorize(roles.Boss), tvshowController.insertTvshow);
router.put('/:id', authorize(roles.Boss), tvshowController.updateTvshow);
router.delete('/:id', authorize(roles.Boss), tvshowController.removeTvshow);

module.exports = router;