const express = require('express');
const db = require('./module_db_connection')
const acregation = require('./module_acregation')
const api = express.Router(); 
const moment = require('moment');

api.get('/', function (req, res) {  
    try {
        let result = db.getCurrentMeasures((data)=>{
            
            let R = {
                timestamp: data.timestamp,
                temperature: (data.temperature2 + data.temperature1)/2,
                pressure: data.pressure,
                humidity: data.humidity,
            }
            
            res.send(R);
        });
    } catch (error) {
        res.status(500).send('Server error occured.')
        console.log(error);
    }
    
});

api.get('/fromto', function (req, res) {
    try {

        //Query parameter
        let from = req.query.from
        let to = req.query.to
        let binSize = req.query.bin;


        let newFrom = moment(from).format("YYYY-MM-DD HH:mm:ss")
        let newTo = moment(to).format("YYYY-MM-DD HH:mm:ss")
        let result = db.getFromToMeasures(newFrom,newTo,(data)=>{
            let finalData = acregation.calculateBin(data,binSize)
            res.send(finalData);
        });
    } catch (error) {
        res.status(500).send('Server error occured.')
        console.log(error);
    }
});

module.exports = api

