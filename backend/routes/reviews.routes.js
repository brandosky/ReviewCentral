const { Router } = require('express');
const { getReviewsPorJuego, addReview, deleteReview, getAllReviews} = require('../controllers/reviews.controller');
const {validarJWT} = require('../middleware/validar-jws');

const router = Router();

//trae
router.get('/:juegoId', getReviewsPorJuego);
//guarda
router.post('/', addReview);

router.get('/all', getAllReviews);

router.delete('/:id', deleteReview);
module.exports = router;