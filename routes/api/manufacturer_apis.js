const express = require('express');
const router = express.Router();

//Item Model

//@route GET api Items
// @desc Get All Items 
// @ access Public
const mysql = require('mysql');
const connection = require('../../config/connection');

router.get('/', (req, res) => {

    connection.query("SELECT * FROM manufacturer", (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO manufacturer(Name) VALUES('${req.body.Name}')`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            console.log("restlut", result);
            connection.query(`SELECT * FROM manufacturer where id=${result.insertId} `, (er, resu) => {
                if (er) {
                    console.log("er", er);
                }
                else {
                    console.log("Response", resu);

                    return res.json(resu[0])
                }
            })
        }
    })

})


router.delete('/:id', (req, res) => {
    console.log("delete id ", req.params.id)
    connection.query(`DELETE FROM manufacturer where id=${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {

            return res.send("Succeffuly Deleted Manufactured")
        }
    })
})

router.put('/:id', (req, res) => {
    console.log("req.params id", req.params.id)
    console.log("req.params", req.body)
    connection.query(`UPDATE manufacturer set Name='${req.body.Name}' where id =${req.params.id}`, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            connection.query('SELECT * FROM manufacturer', (errr, ress) => {
                if (errr) {
                    return res.send(errr)
                }
                else {
                    return res.send(ress)
                }
            })
        }

    })
})
module.exports = router;




