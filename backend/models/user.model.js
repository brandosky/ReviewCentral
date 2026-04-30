const { Schema, model } = require('mongoose');
const UserSchema=Schema ({
    nombre:{
        type:String,
        required:true  
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        default:'registrado'
    }   
});
 UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports=model('User',UserSchema);