const {Schema,model} = require('mongoose');

const ReviewSchema = new Schema({
    juegoId:
    {
        type:String,
        required:true
    },
    usuarioNombre:
    {  
    type:String,
    required:true
                },
    comentario:
    {
    type:String,
    required:true},
    calificacion:
    {
    type:Number,
    required:true,
        min:0,
        max:10
            },
fecha:{
    type:Date,
    default:Date.now
        }
});

module.exports=model('Reivew',ReviewSchema);