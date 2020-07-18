const mytvshowController = require('../controllers/mytvshow-controller.js');
const router = require('express').Router();
const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//tem de estar autenticado
router.get('', authorize(roles.User), mytvshowController.getMyTvshows);
router.get('/:id', authorize(roles.User), mytvshowController.getMyTvshow);
//tem de estar autenticado e pertencer a este role
router.post('/:id', authorize(roles.User), mytvshowController.insertMyTvshow);
router.put('/:id', authorize(roles.User), mytvshowController.updateMyTvshow);
router.delete('/:id', authorize(roles.User), mytvshowController.removeMyTvshow);

module.exports = router;