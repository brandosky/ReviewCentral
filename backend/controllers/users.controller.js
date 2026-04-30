const User=require('../models/user.model');
const {response,request}=require('express');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {generarJWT}=require('../helpers/generar-jwt');


const registerUser=async(req=request,res=response)=>{
    const{nombre,apellido,email,password}=req.body;

    try{
        const existeEmail=await User.findOne({email});
        if(existeEmail){
            return res.status(400).json({msg:'el email que ingresaste ya esta registrado'});
        }
        const user=new User({nombre,apellido,email,password});

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        await user.save();

        res.status(201).json({msg:'usuario registrado con exito',user});
    }catch(error){
        res.status(500).json({msg:'error al registrar el usuario',error});
    }
};

const loginUser=async(req=request,res=response)=>{
    const{email,password}=req.body;
    try{
        const usuarioDB=await User.findOne({email});
        if(!usuarioDB){
            return res.status(400).json({msg:'el usuario no existe'});
        }

        const validPassword=bcrypt.compareSync(password,usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({msg:'contraseña incorrecta'});
        }
    const token = await generarJWT(usuarioDB._id, usuarioDB.nombre);

        res.json({
            msg:'inicio de sesión exitoso',
            usuario:usuarioDB,
            token:token
            });
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'error al iniciar sesion',error});
    }
};
module.exports={registerUser,loginUser};
