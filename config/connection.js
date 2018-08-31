const mysql=require('mysql');
const express=require('express');
module.exports=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Practice'
});
