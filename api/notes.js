const express = require('express');
const router = express();
const mysql = require('mysql');
const crypto = require('crypto');

function encrypt(note, key) {
    var cipher_text = crypto.createCipher('aes-256-cbc', key);
    var crypted_text = cipher_text.update(note, 'utf8', 'hex');
    crypted_text = crypted_text + cipher_text.final('hex');
    return crypted_text;
}

function decrypt(note, key) {
    var decipher_text = crypto.createDecipher('aes-256-cbc', key);
    var decrypted_text = decipher_text.update(note, 'hex', 'utf8');
    decrypted_text = decrypted_text + decipher_text.final('utf8');
    return decrypted_text;
}

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash123!',
    database: 'test',
    port: 3306
})

router.get('/sites/list', (req, res, next) => {
    const userId = req.body.user;
    const sql = 'SELECT note FROM notes WHERE userId = ?';
    connection.query(sql, userId, (err, results, fields) => {
        if (!err) {
            var notes = [];
            for (var i in results) {
                notes.push(decrypt(results[i].note, userId));
                if (notes.length == results.length) {
                    res.status(200).json({
                        notes: notes
                    })
                }
            }
        }
        else {
            res.status(404).json({
                status: err
            })
        }
    })
})

router.post('/sites', (req, res, next) => {
    const userId = req.headers.user;
    const note = req.body.note
    const crypted = encrypt(note, userId)
    const sql = 'INSERT INTO notes (userId, note) VALUES (?, ?)';
    connection.query(sql, [userId, crypted], (err, results, fields) => {
        if (err) {
            res.status(500).json({
                status: err
            })
        }
        else {
            res.status(200).json({
                status: 'success'
            })
        }
    })
})

module.exports = router;