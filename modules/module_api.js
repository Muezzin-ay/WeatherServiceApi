const express = require('express');
const db = require('./module_db_connection')
const api = express.Router(); 
const moment = require('moment');

api.get('/', function (req, res) {
    
    let result = db.getAllMeasures((data)=>{
        res.send(data);
    });
    
});

api.get('/fromto', function (req, res) {
    try {
        let from = req.query.from
        let to = req.query.to
        let newFrom = moment(from).format("YYYY-MM-DD HH:mm:ss")
        let newTo = moment(to).format("YYYY-MM-DD HH:mm:ss")
        let result = db.getFromToMeasures(newFrom,newTo,(data)=>{
            res.send(data);
        });
    } catch (error) {
        res.send(error);
        console.log(error);
    }
    
    
});

api.get('/current', function (req, res) {
    try {
        let result = db.getCurrentMeasures((data)=>{
            res.send(data);
        });
    } catch (error) {
        res.send(error);
        console.log(error);
    }
    
    
});
  


module.exports = api

