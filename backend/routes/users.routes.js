const { Router } = require('express');
const { registerUser, loginUser,deleteUsuario,getUsuarios,toggleFavorito } = require('../controllers/users.controller');

const router = Router();

router.post('/registro', registerUser);
router.post('/login', loginUser);
router.get('/usuarios', getUsuarios);
router.delete('/usuarios/:id', deleteUsuario);
router.post('/favoritos',toggleFavorito);
module.exports = router;