const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // pide el token que vviene en los headers de la peticcion
    const token = req.header('x-token');

    // si no trae token no es aceptado je
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición. Acceso denegado.'
        });
    }

    try {
        // 3. se abre el token con la firma secreta
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'mifirmaSecretajeje');

        // extrae el nombre y el uid y se lo pega a la req
        req.usuario = payload;

        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido o expirado'
        });
    }
};

module.exports = {
    validarJWT
};