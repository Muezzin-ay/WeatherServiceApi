const express = require('express');
const db = require('./module_db_connection')
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
        let from = req.query.from
        let to = req.query.to


        if(moment(from).isValid() && moment(to).isValid()){
            let newFrom = moment(from).format("YYYY-MM-DD HH:mm:ss")
            let newTo = moment(to).format("YYYY-MM-DD HH:mm:ss")
            let result = db.getFromToMeasures(newFrom,newTo,(data)=>{
                res.send(data);
            });
        }else{
            res.send('Please specify "from" and "to" parameter.');
        }
        
    } catch (error) {
        res.status(500).send('Server error occured.')
        console.log(error);
    }
});

module.exports = api

