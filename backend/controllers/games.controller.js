const Game = require('../models/game.model');

//con esto se obtiene los juegos que vaya a haber 
const getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los videojuegos', error });
    }
};

// 2. obtener detalles de un juego por su id_nombre
const getGameById = async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findOne({ id_nombre: id });
        
        if (!game) {
            return res.status(404).json({ msg: 'Videojuego no encontrado' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ msg: 'Error al buscar el videojuego', error });
    }
};

const seedGames = async (req, res) => {
    try {
       
        const count = await Game.countDocuments();
        if (count > 0) {
            return res.status(400).json({ msg: 'La base de datos ya tiene juegos, no se puede inicializar de nuevo.' });
        }

        const juegosIniciales = [
            { id_nombre: "cyberpunk-2077", nombre: "Cyberpunk 2077", genero: "RPG de Acción", plataforma: "PC, PS5, Xbox Series X", portada: "assets/cyberpunk.jpg", descripcion: "Un RPG de acción y aventura de mundo abierto." },
            { id_nombre: "elden-ring", nombre: "Elden Ring", genero: "Action RPG", plataforma: "PC, PS5, Xbox Series X", portada: "assets/Eldenring.jpg", descripcion: "Un vasto mundo de fantasía oscura." },
            { id_nombre: "zelda-botw", nombre: "The Legend of Zelda: BOTW", genero: "Aventura", plataforma: "Nintendo Switch", portada: "assets/botw.jpg", descripcion: "Explora el vasto reino de Hyrule en esta aventura épica." },
            { id_nombre: "rdr2", nombre: "Red Dead Redemption 2", genero: "Acción-Aventura", plataforma: "PC, PS4, Xbox One", portada: "assets/rdr2.png", descripcion: "América, 1899. El fin de la era del salvaje oeste..." }
        ];

        await Game.insertMany(juegosIniciales);
        res.json({ msg: '¡Base de datos inicializada con éxito! Tienes 4 juegos nuevos.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al inicializar la BDD', error });
    }
};
const createGame = async (req, res) => {
    try {
        // req.body contiene los datos (JSON) que nos enviará Angular
        const nuevoJuego = new Game(req.body); 
        
        // Lo guardamos en MongoDB
        await nuevoJuego.save(); 
        
        res.status(201).json({ 
            msg: '¡Videojuego agregado con éxito!', 
            juego: nuevoJuego 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Error al guardar el juego (revisa que el id_nombre no esté repetido)', error });
    }
};
module.exports = {
    getGames,
    getGameById,
    seedGames,
    createGame
};