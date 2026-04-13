const { Router } = require('express');
const { getGames,getGameById,seedGames,createGame} = require('../controllers/games.controller');

const router = Router();

router.get('/seed',seedGames);
router.get('/',getGames);
router.get('/:id',getGameById);
router.post('/', createGame);
module.exports=router;