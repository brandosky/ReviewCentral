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
            user:usuarioDB,
            token:token
            });
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'error al iniciar sesion',error});
    }
};


const getUsuarios = async (req = request, res = response) => {
    try {
        
        const usuarios = await User.find({}, 'nombre apellido email rol');
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};


const deleteUsuario = async (req = request, res = response) => {
    const { id } = req.params; 
    try {
        await User.findByIdAndDelete(id);
        res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
};

const toggleFavorito = async (req = request, res = response) => {const { idUsuario, idJuego } = req.body;

    try {
        const usuario = await User.findById(idUsuario);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        //buscamos si el juego esta en sus favoritos
        const index = usuario.favoritos.indexOf(idJuego);
        //no lo tiene se pone
        if (index === -1) {
            usuario.favoritos.push(idJuego);
        } else {
            //ya lo tiene, se lo quita
            usuario.favoritos.splice(index, 1);
        }

        await usuario.save();

        res.json({ 
            msg: 'Favoritos actualizados', 
            favoritos: usuario.favoritos 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar favoritos' });
    }
};

module.exports = { 
    registerUser, 
    loginUser, 
    getUsuarios, 
    deleteUsuario,
    toggleFavorito
};
