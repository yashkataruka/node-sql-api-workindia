const express = require('express');
const router = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash123!',
    database: 'test',
    port: 3306
})

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, username, async (err, results, fields) => {
        if (err) {
            res.status(500).json({
                status: err
            })
        }
        else {
            if (results.length > 0) {
                console.log("User Already exists");
                res.status(201).json({
                    status: 'User Already exists'
                })
            }
            else {
                const sql_2 = 'INSERT INTO users VALUES (?, ?, ?)'
                const hashPassword = await bcrypt.hash(password, 10)
                const userId = Math.floor(Math.random() * (90000 - 10000) + 10000);
                connection.query(sql_2, [userId, username, hashPassword], (error, results, fields) => {
                    if (err) {
                        res.status(500).json({
                            status: err
                        })
                    }
                    else {
                        res.status(200).json({
                            status: "account created "
                        })
                    }
                })
            }
        }
    })
})

router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, username, async (err, results, fields) => {
        if (err) {
            res.status(500).json({
                status: err
            })
        }
        else {
            if (results.length == 0) {
                console.log("User Doesn't exists");
                res.status(201).json({
                    status: 'User Doesn\'t exists'
                })
            }
            else {
                const comparison = await bcrypt.compare(req.body.password, results[0].password)
                if (comparison) {
                    const sql_2 = 'SELECT userId FROM users WHERE username = ?'
                    connection.query(sql_2, username, (err, results, fiels) => {
                        res.status(200).json({
                            status: "success",
                            userId: results[0].userId
                        })
                    })
                }
                else {
                    res.status(201).json({
                        status: "Password wrong!"
                    })
                }
            }
        }
    })
})

module.exports = router;