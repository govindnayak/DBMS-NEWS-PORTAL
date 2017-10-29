var
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  sql = require('mysql'),
  formidable = require('formidable'),
  fs = require('fs'),
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


app.post("/login", function(req , res){

  connection.query('select username,password from admin WHERE (username = ? AND password = ? )',[req.body.username,req.body.password], function(err, result){

    if(err)
    {
      console.log(err);
      res.send({"success":false , "message":"failed", "status": 0});

    }
    else if(result.length)
    res.send({"success":true , "message":"successful", "status": 1});

    else {
      res.send({"success":false , "message":"failed", "status": 0});

    }

  })
});

app.get("/home", function(req, res){
      connection.query("select * from article", function(err, data){
        if(err)
        {
          console.log("Error while querying database :- " + err);
          res.send(err);
        }
        else {
        //  console.log(data);
          res.send(data);

        }
      })
});

app.get("/articles/:id", function(req, res){
      connection.query("select * from article where cid = ?", [id] , function(err, data){
        if(err)
        {
          console.log("Error while querying database :- " + err);
          res.send(err);
        }
        else {
        //  console.log(data);
          res.send(data);

        }
      })
});

app.post("/admin", function(req, res){

  var newpath;

  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.image.path;
      var newpath = '/home/nayak/Desktop/myapp/public/images/' + files.image.name;
      console.log(files.image.name);
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.end();
      });
 });


  console.log("New path" + newpath);
  var adminid;
  var cat;

  connection.query('select admin_id from admin WHERE username = ?', [req.body.adminname], function(err, data){
    if(err) throw err;
    adminid = data[0].admin_id;
  })

  connection.query('select cid from category WHERE category = ?', [req.body.category], function(err, data){
    if(err) throw err;
    cat = data[0].cid;
  })

  connection.query('insert into article values(?, ?, ?, ?, ?, ?, ?)',[req.body.newsid, req.body.content, req.body.date, adminid, newpath, cat, req.body.headline ], function(err, result){

    if(err)
    {
      console.log(err);
      res.send({"success":false , "message":"failed"});

    }
    else {
      res.send({"success":false , "message":"successful"});
    }
})
});
/*restAPI how to create
how to make a post request to restAPI */
