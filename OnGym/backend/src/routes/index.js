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
                    const names = user.names;
                    const token = jwt.sign({ _id: user.idTrainer, _type: type }, 'OnGym');
                    return res.status(200).json({ token, names });
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
router.get('/getNumberRoutines', verifyToken, async(req, res) => {
    await pool.query('select * from routines;', function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        if (results) {
            res.status(200).send(results)
        }
    })
})

router.post('/postAthleteRoutine', verifyToken, (req, res) => {
    const { idAthlete, idRoutines } = req.body;
    pool.query('insert into routines_has_athlete(Athlete_idAthlete,Routines_idRoutines) values (?,?);', [idAthlete, idRoutines], function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        if (results) {
            res.status(200).send(results)
        }
    })
})

router.get('/getMyRoutines', verifyToken, (req, res) => {
    const { idAthlete } = req.body;
    pool.query('select routines.idRoutines from routines join athlete_has_routines on athlete_has_routines.Routines_idRoutines = routines.idRoutines join athlete on athlete.idAthlete = athlete_has_routines.Athlete_idAthlete where athlete.idAthlete = ? ', idAthlete, function(error, results, fields) {
        if (error) {
            res.status(400).send(error)
        }
        if (results) {
            pool.query('select routines.name, exercises.name, exercise.image,exercise.description,exercise.set, exercise.repetitions from exercises join routines_has_exercises on routines_has_exercises.Exercises_idExercises = exercises.idExercises join routines on routines.idRoutines = routines_has_exercises.Routines_idRoutines where routines.idRoutines = ? ', results[0], function(error, results, fields) {
                if (error) {
                    res.status(400).send(error)
                }
                if (results) {
                    res.send(results)
                }
            })
        }
    })

})

router.get('/getRoutines', verifyToken, async(req, res) => {
    await pool.query('select routines.idRoutines,routines.name,routines.price,exercises.idExercises,exercises.name  from exercises join routines_has_exercises on routines_has_exercises.Exercises_idExercises = exercises.idExercises join routines on routines.idRoutines = routines_has_exercises.Routines_idRoutines ;', function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        if (results) {
            res.status(200).send(results)
        }
    })
})

router.get('/getExercises', verifyToken, (req, res) => {
    pool.query('SELECT * FROM exercises;', function(error, results, fields) {
        if (error) {
            res.status(500).send({ message: error })
        }
        if (results) {
            res.status(200).json(results);
        }
    })
})

router.post('/postRutine', verifyToken, (req, res) => {
    console.log(req.body)
    const { name, price, exercises } = req.body;
    pool.query('insert into `routines`(`name`,`price`) values (?,?)', [name, price], function(error, results, fields) {
        if (error) {
            res.status(400).send(error)
        }
        if (results) {
            idroutine = results.insertId;
            for (var i = 0; i < exercises.length; i++) {
                pool.query('insert into routines_has_exercises(Routines_idRoutines,Exercises_idExercises) values (?,?);', [idroutine, exercises[i].idExercises], function(error, results, fields) {
                    if (error) {
                        res.status(400).send(error)
                    }
                })
            }
            res.status(200).send('rutina creada');
        }
    })
})

router.get('/getAthletes', verifyToken, (req, res) => {
    const { idTrainer } = req.body;
    console.log(req.body)
    pool.query('select * from athlete where Trainer_idTrainer=?', idTrainer, function(error, results, fields) {
        if (error) {
            res.status(400).send(error);
        }
        console.log(results);
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(201).send('No tienes deportistas asignados')
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