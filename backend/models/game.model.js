const {Schema,model} = require('mongoose');

const gameSchema = new Schema({
    id_nombre:{
        type:String,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true
    },
    genero:{
        type:String,
        required:true
    },
    plataforma:{
        type:String,
        required:true
    },
    portada:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    }
});

gameSchema.methods.toJSON=function(){
    const {__v, ...game}=this.toObject();
return game;
}

module.exports=model('GAME',gameSchema);
    