
const bodyParser = require('body-parser');
const mysql=require('mysql');
const express = require('express');
var manufacturer_apis=require('./routes/api/manufacturer_apis');
var item_apis=require('./routes/api/item_apis');
const connection=require('./config/connection');
const cors=require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
connection.connect(err=>{
    if(err){
        console.log("Err",err);
    }
})

app.use(cors());
//body pasrse middleware


app.use('/api/manufacturer/' , manufacturer_apis);
app.use('/api/item/' , item_apis);
app.listen(port, () => console.log("server Start on Port ", port))



