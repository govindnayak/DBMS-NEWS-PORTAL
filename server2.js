var
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  sql = require('mysql'),
  formidable = require('formidable'),
  datetime = require('node-datetime'),
  fs = require('fs'),

  port = 4000;

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
//////////////////////////////////////////////////////////////////////////////////////////////
app.get("/home", function(req, res){
      connection.query("select * from article ORDER BY aid desc", function(err, data){
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

app.get("/politics", function(req, res){
      connection.query("select * from article where cid = ?", [1111], function(err, data){

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
app.get("/technology", function(req, res){
      connection.query("select * from article where cid = ?", [2222], function(err, data){
        
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
app.get("/international", function(req, res){
      connection.query("select * from article where cid = ?", [3333], function(err, data){
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
app.get("/business", function(req, res){
      connection.query("select * from article where cid = ?", [4444], function(err, data){
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
app.get("/movies", function(req, res){
      connection.query("select * from article where cid = ?", [5555], function(err, data){
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
app.get("/sports", function(req, res){
      connection.query("select * from article where cid = ?", [6666], function(err, data){
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

/////////////////////////////////////////////////////////////////////////////////////////////
app.post("/admin", function(req, res){
  //console.log("New path" + newpath);
  var adminid;
  var cat;
  var dat = datetime.create();
  var formatteddate = dat.format('Y-m-d H:M:S');

  connection.query('select admin_id from admin WHERE username = ?', [req.body.adminname], function(err, data){
    if(err) throw err;
    adminid = data[0].admin_id;


  connection.query('select cid from category WHERE admin_id = ?', adminid, function(err, data){
    if(err) throw err;

    cat = data[0].cid;


    connection.query('insert into article (content, date, admin_id, img_url, cid, headline) values(?, ?, ?, ?, ?, ?)',[req.body.content, formatteddate, adminid, req.body.image, cat, req.body.headline], function(err, result){

      if(err)
      {
        console.log(err);
        res.send({"success":false , "message":"failed"});

      }
      else {

        res.send({"success":true , "message":"successful"});
      }
  })
  })
  })
});

app.post("/delete", function(req, res){

      connection.query('select admin_id from admin WHERE username = ?', [req.body.adminname], function(err, data){
        if(err) throw err;
        adminid = data[0].admin_id;
console.log(req.body.deleteheadline);
    connection.query('delete from article WHERE( headline = ? AND admin_id = ?)', [req.body.deleteheadline, adminid], function(err, data){
      console.log(data);
      if(err || (data.affectedRows==0))
      {
        console.log(err);
        res.send({"success":false , "message":"Sorry, could not delete news!"});

      }
      else {

        res.send({"success":true , "message":"Deleted"});
      }
    })
  })

});



app.post("/feedback", function(req, res){
  //console.log("New path" + newpath);

    connection.query('insert into feedback values(?, ?, ?, ?, ?)',[req.body.email, req.body.phone, req.body.comment, req.body.line, req.body.correction], function(err, result){

      if(err)
      {
        console.log(err);
        res.send({"success":false , "message":"failed"});

      }
      else {
        console.log(result);
        res.send({"success":true , "message":"successful"});
      }
  })
});

app.post("/polling", function(req, res){
  //console.log("New path" + newpath);

    connection.query('select * from poll', function(err, result){

      if(err)
      {
        console.log(err);
        res.send({"success":false , "message":"failed"});

      }
      else {
        console.log(result);
        res.send({"success":true , "message":"successful"});
      }
  })
});
/*restAPI how to create
how to make a post request to restAPI */
