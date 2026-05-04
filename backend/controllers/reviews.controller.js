const { response, request } = require('express');
const Review = require('../models/review.model');

//  se obtienen todas las reseñas de un solo juego jeje
const getReviewsPorJuego = async (req = request, res = response) => {
    const { juegoId } = req.params; // Sacamos el id de la url 

    try {
        // busca en mongo solo las reseñas que coincidan con este juego
        // y se ordena de la más nueva a la mas vieja (-1)
        const reviews = await Review.find({ juegoId }).sort({ fecha: -1 });
        
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener reseñas' });
    }
};

// 2. guarda una reseña nueva
const addReview = async (req = request, res = response) => {
    const { juegoId, comentario, calificacion } = req.body;
    const usuarioNombre = req.usuario.nombre;
    try {
        const nuevaReview = new Review({ juegoId, usuarioNombre, comentario, calificacion });
        await nuevaReview.save();

        res.status(201).json({
            msg: '¡Reseña publicada con éxito!',
            review: nuevaReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la reseña' });
    }
};

module.exports = {
    getReviewsPorJuego,
    addReview
};