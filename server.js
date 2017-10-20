var
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  sql = require('mysql'),
  port = 3001;

var sqlConfig = {
      user: 'root',
      password: 'Chanakya@198',
      server: 'localhost',
      database: 'news'
}

var connection = sql.createConnection(sqlConfig);

var server=app.listen(port,function(){
  console.log("magic happens at port " + port);
})

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


var  executeQuery = function(res, query){
     connection.connect(function (err) {
         if (err) {
                     console.log("Error while connecting database :- " + err);
                     res.send(err);
                  }
                  else {
                         // create Request object
                         // query to the database
                         connection.query(query, function (err, res) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                      res.send(err);
                                     }
                                     else {
                                       res.send(res);
                                            }
                               });
                       }
      });
};


app.get("/login", function(req , res){
                var query = "select * from category";
                executeQuery (res, query);
});
/*restAPI how to create
how to make a post request to restAPI */
