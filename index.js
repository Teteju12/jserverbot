const express = require('express');
var bodyparser = require('body-parser');
const http = require('http');
const fileType = require('file-type');
var app = express();

var nonDuplicatedNamesList = [];

var lastOrder;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', function(req,res){
  res.send("Test of Jserverbot");
});


app.post('/removeduplicatewords', function(req,res){
  nonDuplicatedNamesList = [];
  var stringnames = req.body.palabras;
  var finalList = "";
  var newword = "";
  var copied = false;

  for(let i = 0; i <= stringnames.length; i++){

    if(stringnames[i] == "," || i == stringnames.length){

      if(nonDuplicatedNamesList.length != 0){
        for(let j= 0; j < nonDuplicatedNamesList.length; j++){
            if(newword == nonDuplicatedNamesList[j]){
              //we add the word to the list
              copied = true;
            }
        }
        if(!copied){
          nonDuplicatedNamesList.push(newword);
        }
        copied = false;
        newword = "";
      }
      else{
        nonDuplicatedNamesList.push(newword);
        newword = "";
      }


    }
    else{
      newword += stringnames[i];
    }

  }

  for(let j= 0; j < nonDuplicatedNamesList.length; j++){

    if(j == 0){
      finalList += nonDuplicatedNamesList[j];
    }
    else{
      finalList += "," + nonDuplicatedNamesList[j];
    }

  }

  res.send(finalList);
  console.log(finalList);

});

app.post('/detectfiletype', function(req,res){

  var url = req.body.url;

  http.get(url, function(response){
      response.on('readable', function(){
          const chunk = response.read(fileType.minimumBytes);
          response.destroy();
          res.send(fileType(chunk));
          console.log(fileType(chunk));
      });
    });
});


app.get('/botorder/:order', function(req,res){

  if(lastOrder != null){
    res.send(lastOrder);
  }
  else{
    res.send("NONE");
  }

});
app.post('/botorder/:order', function(req,res){

  if(req.body.botorder != null){
    var neworder = req.body.botorder;

    lastOrder = neworder;
    console.log("OK")
    res.send("OK");
  }

});

app.listen(process.env.PORT || 8000);
