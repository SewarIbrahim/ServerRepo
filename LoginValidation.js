
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

MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
     if(err) { return console.dir(err); }

      var notesCollection = db.collection('notesColl');

      notesCollection.find().toArray(function(err, items)
       { 
          var JSONarray={"array": items};
          response.send(JSONarray);
       });  //to retrieve names
    });
});

/////////////////////////////////////////////////////////////////////////
app.post('/saveNote', function(request,response){
   
    var title = request.body.Title;
    var desc = request.body.Description;

    MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
     if(err) { return console.dir(err); }

     var notesCollection = db.collection('notesColl');

     notesCollection.insert(newNote, {w:1}, function(err, result) {  //Using the {w:1} option ensure you get the error back if the document fails to insert correctly.
      if(err)   {console.log(err);}
       else     {console.log('a new note is inserted');}
    });
  
    var json = JSON.stringify( newNote);
    response.send(json);});
});

////////////////////////////////////////////////////////////////////////
var server = app.listen(8081, function() {
console.log('Listening on port %d', server.address().port);
})


