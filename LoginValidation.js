
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyParser());
////////////////////////////////////////////////////////////////////////
app.post('/login', function(request, response){ 
 
	var username = request.body.username;
	var password = request.body.password;
	var result = false;

  MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
     if(err) { return console.dir(err); }

      var usersCollection = db.collection('usersColl');

     usersCollection.findOne({'username': username, 'password':password}, function(err, item) {
      if(err){console.log(err);}
      else
      { if (item != null){
               result=true;   }  

        var JsonObject = { status: result };  
        var json = JSON.stringify( JsonObject);
        response.send(json);
      }
    });
 });
});
////////////////////////////////////////////////////////////////////////

app.post('/registration', function(request, response){ 
 
  var username = request.body.username;
  var password = request.body.password;
  var newUser = {'username': username , 'password':password};

  MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
     if(err) { return console.dir(err); }

     var usersCollection = db.collection('usersColl');

    usersCollection.insert(newUser, {w:1}, function(err, result) {  //Using the {w:1} option ensure you get the error back if the document fails to insert correctly.
      if(err)   {console.log(err);}
       else     {console.log('a new user is inserted');}
    });

 });
  
  var json = JSON.stringify( newUser);
  response.send(json);
});

////////////////////////////////////////////////////////////////////////

app.get('/list', function(request,response){

console.log('I am in GET');

var obj1= {ID: 1 , Title : "note#1" , Desc : "This is note#1"};
var obj2= {ID: 2 , Title : "note#2" , Desc : "This is note#2"};
var obj3= {ID: 3 , Title : "note#3" , Desc : "This is note#3"};
var obj4= {ID: 4 , Title : "note#4" , Desc : "This is note#4"};
var obj5= {ID: 5 , Title : "note#5" , Desc : "This is note#5"};
var obj6= {ID: 6 , Title : "note#6" , Desc : "This is note#6"};
var obj7= {ID: 7 , Title : "note#7" , Desc : "This is note#7"};
var obj8= {ID: 8 , Title : "note#8" , Desc : "This is note#8"};

var JSONarray = {"array":[obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8]};
console.log(JSONarray);
response.send(JSONarray);
});

app.post('/saveNote', function(request,response){
   
    var title = request.body.Title;
    var desc = request.body.Description;

    console.log(title);
    console.log(desc);

    response.send('saved');
});


var server = app.listen(8081, function() {
console.log('Listening on port %d', server.address().port);
})


