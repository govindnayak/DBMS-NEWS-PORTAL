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
  console.log(req.body.permission);
  connection.query('select username,password from admin WHERE (username = ? AND password = ? AND roll = ?)',[req.body.username,req.body.password, req.body.permission], function(err, result){

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

app.get("/editor", function(req, res){
  //console.log("New path" + newpath);
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
//////////////////////////////////////////////////////////////////////////////////////////////
app.get("/home", function(req, res){
      connection.query("select * from article WHERE approval=1 ORDER BY aid desc", function(err, data){
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
      connection.query("select * from article where cid = ? AND approval = ?", [1111, 1], function(err, data){

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
      connection.query("select * from article where cid = ? AND approval = ?", [2222, 1], function(err, data){
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
      connection.query("select * from article where cid = ? AND approval = ?", [3333, 1], function(err, data){
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
      connection.query("select * from article where cid = ? AND approval = ?", [4444, 1], function(err, data){
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
      connection.query("select * from article where cid = ? AND approval = ?", [5555, 1], function(err, data){
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
      connection.query("select * from article where cid = ? AND approval = ?", [6666, 1], function(err, data){
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


    connection.query('insert into article (content, date, admin_id, img_url, cid, headline, approval) values(?, ?, ?, ?, ?, ?, ?)',[req.body.content, formatteddate, adminid, req.body.image, cat, req.body.headline, 0], function(err, result){

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

  connection.query('delete from article WHERE( headline = ?)', [req.body.deleteheadline], function(err, data){

      if(err || (data.affectedRows==0))
      {
        console.log(err);
        res.send({"success":false , "message":"Sorry, could not delete news!"});

      }
      else {

        res.send({"success":true , "message":"Deleted"});
      }
    })

});

app.post("/approve", function(req, res){

    console.log(req.body.appheadline);

    connection.query('update article set approval = ? where headline = ?',[1, req.body.appheadline], function(err, data){

      if(err || (data.affectedRows==0))
      {
        console.log(err);
        res.send({"success":false , "message":"Sorry, could not delete news!"});

      }
      else {

        res.send({"success":true , "message":"Deleted"});
      }
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

app.post("/polls", function(req, res){
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
