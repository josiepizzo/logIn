var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/*+json' }));
var session = require('express-session');
var path = require('path');

app.use('/public', express.static(process.cwd() + '/public'));

var PORT = process.env.NODE_ENV || 3000;

app.post('/login', function(req, res){
    res.json(req.body)
    console.log(req.body.uid);
    models.user.findOne({
        where: {uid: req.body.uid} 
      }).then (function(data){
        console.log(data);
        req.session.user = data;
        res.end();
    });
})

app.post('/register', function(req, res){
    res.json(req.body)
    models.user.create({
        uid: req.body.uid,
        name: req.body.name,
        email: req.body.email,
      }).then (function(data){
        console.log(data);
        req.session.user = data;
        res.end();
    });
});

app.get('/logout', function(req,res){
  delete req.session.user;
  res.redirect('/');
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/view/login.html')
});



app.listen(PORT, function() {
  console.log('App is listening on port:%s', PORT);
});