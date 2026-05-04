const express = require('express');
const cors = require('cors');
const {dbConection} = require('./database');    

class Server{
    constructor(){
        this.app=express();
        this.port=8084;

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }
    routes() {
        this.app.get('/api/test', (req, res) => {
            res.json({ msg: 'api de ReviewCentral listo' });
        });

        this.app.use('/api/users', require('../routes/users.routes'));  
        this.app.use('/api/games', require('../routes/game.routes'));
        this.app.use('/api/reviews', require('../routes/reviews.routes'));    
    }
    listen(){
        this.app.listen(this.port,()=>{
console.log('el servidor esta corriendo en el puerto ', this.port);
        });
    }
}

module.exports=Server;