const express = require('express');
const router = express.Router();
const user = require('../models/user.js');

const pool = require('../database');
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers.js');

router.get('/', (req, res) => {
    res.send('home')
})

router.post('/login', async(req, res) => {
    const { correo, password, type } = req.body;
    const newUser = {
        correo,
        contraseña: password
    }
    console.log(newUser)
    pool.query('SELECT * FROM ' + type + ' WHERE correo=? ', [correo], async function(error, results, fields) {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            const user = results[0];
            console.log(user);
            const validPassword = await helpers.matchPassword(password, user.contraseña)
            if (validPassword) {
                if (type == 'entrenador') {
                    const token = jwt.sign({ _id: user.idEntrenador, _type: type }, 'secret');
                    return res.status(200).json({ token });
                } else {
                    const token = jwt.sign({ _id: user.idDeportista, _type: type }, 'secret');
                    return res.status(200).json({ token });
                }

            } else {
                return res.status(401).send("contraseña incorrecta");
            }
        } else {
            return res.status(401).send("el usuario no existe");
        }
    });
})

router.post('/registroEntrenador', async(req, res) => {
    const { nombres, primerapellido, segundoapellido, correo, password } = req.body;
    let newEntrenador = {
        nombres,
        primerapellido,
        segundoapellido,
        correo,
        contraseña: password
    }
    newEntrenador.contraseña = await helpers.encryptPassword(password);
    await pool.query('INSERT INTO entrenador set ?', newEntrenador, async function(error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            newEntrenador.id = results.insertId;
            console.log(newEntrenador);
            const token = jwt.sign({ _id: newEntrenador.id, _type: 'entrenador' }, 'secret');
            res.status(200).json({ token });
        }
    });

})

router.post('/registroDeportista', async(req, res) => {
    const { nombres, primerapellido, segundoapellido, correo, contraseña, direccion, telefono, peso, estatura, idEntrenadorD } = req.body;
    let newDeportista = {
        nombres,
        primerapellido,
        segundoapellido,
        correo,
        contraseña,
        direccion,
        telefono,
        peso,
        estatura,
        idEntrenadorD
    }
    newDeportista.contraseña = await helpers.encryptPassword(contraseña);
    await pool.query('INSERT INTO deportista set ?', newDeportista, function(error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            newDeportista.id = results.insertId;
            console.log(newDeportista);
            res.status(200).send('deportista agregado');
        }
    });
})

router.get('/traerRutinas', verifyToken, (req, res) => {

})

router.get('/profile', verifyToken, (req, res) => {

})

router.post('/crearRutina', verifyToken, (req, res) => {

})

router.get('/traerDeportistas', verifyToken, (req, res) => {

})

router.post('/logOut', verifyToken, (req, res) => {

})

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.redirect('/login');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.redirect('/login');
    }
    const payload = jwt.verify(token, 'secret');
    if (payload._type == 'entrenador') {
        req.idEntrenador = payload._id;
    }
    if (payload._type == 'deportista') {
        req.idDeportista = payload._id;
    }
    next();
}