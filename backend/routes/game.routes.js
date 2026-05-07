const { Router } = require('express');
const { getGames,getGameById,seedGames,createGame,updateGame,deleteGame } = require('../controllers/games.controller');

const router = Router();

router.get('/seed',seedGames);
router.get('/',getGames);
router.get('/:id',getGameById);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);
module.exports=router;