const express = require('express');
const router = express.Router();

//Item Model

//@route GET api Items
// @desc Get All Items 
// @ access Public
const mysql = require('mysql');
const connection = require('../../config/connection');

router.get('/:id', (req, res) => {

    // connection.query(`SELECT * FROM item where Manufacturer_Id=${req.params.id}`, (error, result) => {
    connection.query(`SELECT i.Item_Name ,i.Price ,i.Manufacturer_Id, i.id as item_id,m.id as Manufacturer_Id ,m.Name from item i JOIN manufacturer m on i.Manufacturer_Id=m.id where i.Manufacturer_Id=${req.params.id}`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
            return res.send(result)
        }
    })
});

router.post('/', (req, res) => {
    connection.query(`INSERT INTO item(Item_Name,Price,Manufacturer_Id) VALUES('${req.body.Item_Name}','${req.body.Price}','${req.body.Manufacturer_Id}')`, (error, result) => {
        if (error) {
            return res.send(error)
        }
        else {
           
            connection.query(`SELECT i.Item_Name ,i.Price ,i.Manufacturer_Id, i.id as item_id,m.id as Manufacturer_Id ,m.Name  from item i JOIN manufacturer m on i.Manufacturer_Id=m.id where i.Manufacturer_Id=${req.body.Manufacturer_Id}`, (error, result) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    return res.send(result)
                }
            })
        }
    })

})


router.delete('/:id', (req, res) => {
    console.log("delete id ", req.params)
    connection.query(`DELETE FROM item where id=${req.params.id}`, (error, result) => {
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
    connection.query(`UPDATE item set Item_Name='${req.body.Item_Name}',Price='${req.body.Price}' where id =${req.params.id}`, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            connection.query('SELECT * FROM item', (errr, ress) => {
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




