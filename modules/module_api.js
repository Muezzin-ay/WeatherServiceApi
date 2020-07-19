const express = require('express');
const db = require('./module_db_connection')
const api = express.Router(); 

api.get('/', function (req, res) {
    
    let result = db.getAllMeasures((data)=>{
        res.send(data);
    });
    
  });
  


module.exports = api

