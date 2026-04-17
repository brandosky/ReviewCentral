const{Router}=require('express');
const{registerUser,loginUser}=require('../controllers/users.controllers');

const router=Router();

router.post('/registro',registerUser);
router.post('/login',loginUser);

module.exports=router;
