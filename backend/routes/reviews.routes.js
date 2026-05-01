const { Router } = require('express');
const { getReviewsPorJuego, addReview } = require('../controllers/reviews.controller');

const router = Router();

//trae
router.get('/:juegoId', getReviewsPorJuego);
//guarda
router.post('/', addReview);

module.exports = router;