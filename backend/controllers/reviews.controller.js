const { response, request } = require('express');
const Review = require('../models/review.model');

// 1. Obtener todas las reseñas de un solo juego
const getReviewsPorJuego = async (req = request, res = response) => {
    const { juegoId } = req.params;
    try {
        const reviews = await Review.find({ juegoId }).sort({ fecha: -1 });
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener reseñas' });
    }
};

// 2. Guardar una reseña nueva (¡AQUÍ ESTABA EL ERROR!)
const addReview = async (req = request, res = response) => {
    // Ya NO buscamos req.usuario.nombre, todo viene del req.body
    const { juegoId, comentario, calificacion, usuarioNombre } = req.body;
    
    try {
        const nuevaReview = new Review({ juegoId, usuarioNombre, comentario, calificacion });
        await nuevaReview.save();

        res.status(201).json({
            msg: '¡Reseña publicada!',
            review: nuevaReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al guardar la reseña' });
    }
};

// 3. Obtener TODAS las reseñas de la plataforma (Para el Panel Admin)
const getAllReviews = async (req = request, res = response) => {
    try {
        const reviews = await Review.find().sort({ fecha: -1 });
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener todas las reseñas' });
    }
};

// 4. Eliminar una reseña por su ID
const deleteReview = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await Review.findByIdAndDelete(id);
        res.json({ msg: 'Reseña eliminada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar la reseña' });
    }
};

module.exports = {
    getReviewsPorJuego,
    addReview,
    getAllReviews,
    deleteReview
};