const { json } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs');

const dataPath = "./data/notes.json";

/* GET all Notes. */
router.get('/', function(req, res, next) {
  fs.readFile(dataPath, (err,data) =>{
      if(err) {
          throw err;
      }

      res.send(JSON.parse(data));
  });
});

/* GET  Note by id. */
router.get('/:id', function(req, res, next) {
    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        var id = req.params.id;
        var notesdata = JSON.parse(data);

        res.send(notesdata[id]);
        //TODO: Hantera att endast giltiga ID funkar
    });
});

//POST a new Note
router.post('/', function(req, res, next) {

    var notesdata;

    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        
        notesdata = JSON.parse(data);
        
        var newNotesId = Object.keys(notesdata).length + 1;
        
        notesdata[newNotesId] = JSON.parse(req.body.data);
        notesdata[newNotesId].id = newNotesId;
        
        fs.writeFile(dataPath, JSON.stringify(notesdata), (err)=>{
            if(err) {
                throw err;
            };
            res.status(200).send("new user added successfully");
        });
    });
    
});

module.exports = router;
