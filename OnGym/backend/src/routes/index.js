const express = require('express');
const router = express.Router();

const pool = require('../database');
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers.js');


router.post('/login', async(req, res) => {
    const { mail, password, type } = req.body;
    const newUser = {
        mail,
        password
    }
    console.log(newUser);
    console.log(type);
    pool.query('SELECT * FROM ' + type + ' WHERE mail=? ', mail, async function(error, results, fields) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        if (results.length > 0) {
            const user = results[0];
            console.log(user);
            const validPassword = await helpers.matchPassword(password, user.password)
            if (validPassword) {
                if (type == 'Trainer') {
                    const token = jwt.sign({ _id: user.idTrainer, _type: type }, 'OnGym');
                    return res.status(200).json({ token });
                } else {
                    const token = jwt.sign({ _id: user.idAthlete, _type: type }, 'OnGym');
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

router.post('/singUpTrainer', async(req, res) => {
    let exist;
    const { names, surname, secondsurname, mail, password } = req.body;
    pool.query('SELECT mail FROM trainer WHERE mail=?', mail, async function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        if (results.length > 0) {
            res.status(400).send('correo existente');
        } else {
            let newTrainer = {
                names,
                surname,
                secondsurname,
                mail,
                password
            }
            newTrainer.password = await helpers.encryptPassword(password);
            newTrainer.nAthletes = 0;

            await pool.query('INSERT INTO trainer set ?', newTrainer, async function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    newTrainer.idTrainer = results.insertId;
                    console.log(newTrainer);
                    const token = jwt.sign({ _id: newTrainer.idTrainer, _type: 'Trainer' }, 'OnGym');
                    res.status(200).json({ token });
                }
            });
        }
    });
})

router.post('/singUpAthlete', async(req, res) => {
    const { names, surname, secondsurname, mail, password, address, phone, weight, height } = req.body;
    pool.query('SELECT mail FROM athlete WHERE mail=?', mail, async function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        if (results.length > 0) {
            res.status(400).send('correo existente');
        } else {
            let newAthlete = {
                names,
                surname,
                secondsurname,
                mail,
                password,
                address,
                phone,
                weight,
                height
            }
            newAthlete.password = await helpers.encryptPassword(password);
            pool.query('select idTrainer from trainer where nAthletes in (select min(nAthletes) from trainer);', function(error, results, fields) {
                if (error) {
                    console.log(error);
                    newAthlete.Trainer_idTrainer = 0;
                }
                if (results.length > 0) {
                    newAthlete.Trainer_idTrainer = results[0].idTrainer;
                    pool.query('update trainer set nAthletes=nAthletes+1 where idtrainer=?', newAthlete.Trainer_idTrainer, function(error, results, fields) {
                        if (error) {
                            res.status(500).send('error al registrarse')
                        }
                        if (results) {
                            res.status(200);
                        }
                    })
                } else {
                    newAthlete.Trainer_idTrainer = 0;
                }
            });
            await pool.query('INSERT INTO athlete set ?', newAthlete, function(error, results, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    newAthlete.idAthlete = results.insertId;
                    console.log(newAthlete);
                    const token = jwt.sign({ _id: newAthlete.idAthlete, _type: 'Athlete' }, 'OnGym');
                    res.status(200).json({ token });
                }
            });
        }
    })
})

router.get('/getRoutines', verifyToken, (req, res) => {

})

router.post('/postRoutine', verifyToken, (req, res) => {

})

router.post('/postExercise', verifyToken, (req, res) => {

})

router.get('/prueba', (req, res) => {
    pool.query("select * from trainer")
})

router.get('/getAthletes', verifyToken, (req, res) => {
    const { idTrainer } = req.body;
    console.log(req.body)
    pool.query('select * from athlete where idTrainerA=?', idTrainer, function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        console.log(results);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(201).json('No tienes deportistas asignados')
        }
    })
})

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.res.status(401).send('Unauhtorized Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauhtorized Request');
    }
    const payload = jwt.verify(token, 'OnGym');
    console.log(payload)
    if (payload._type == 'Trainer') {

        req.body.idTrainer = payload._id;
        console.log(req.body);
        next();
    }
    if (payload._type == 'Athlete') {
        req.body.idAthlete = payload._id;
        next();
    }

}