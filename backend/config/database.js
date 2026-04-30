const mongoose = require('mongoose');

const dbConection=async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/reviewcentral');
        // mongodb+srv://brandon:12345@cluster0.lvuel20.mongodb.net/
        
        console.log('base de datos conectada jeje');
    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
        // tambien se puede detener el proceso con process.exit(1);
    }
}

module.exports={
    dbConection 
}