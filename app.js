var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var client = require('twilio')("<TWILIO_SID>", "<TWILIO_TOKEN>");


var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://localhost:5000";
var itsyPage = "http://itsy-bitsy-bums.myshopify.com/collections/blankets-and-nursery/products/copy-of-tula-blanket-clever-set?variant=18323812801"


var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);






var ItsyNaida = 0;
var ItsyTula = 0;







var ItsySearch = function(){

  request(itsyPage, function(error, response, body){
  console.log("Starting Itsy search now...");
  if(error){
    console.log("Error : " + error);
  }
  if(response.statusCode === 200){
    var $ = cheerio.load(body);
    // console.log($('form').children());

    var whichDapper = $('main')[0].children[1].children[3].children[5].children[2].next.children[1].children[3].children[9].children[1].children[1].attribs.value;

    var whichTrend = $('main')[0].children[1].children[3].children[5].children[2].next.children[1].children[3].children[9].children[1].children[3].attribs.value

    var whichNaida = $('main')[0].children[1].children[3].children[5].children[2].next.children[1].children[3].children[9].children[1].children[5].attribs.value;

    var whichTula = $('main')[0].children[1].children[3].children[5].children[2].next.children[1].children[3].children[9].children[1].children[7].attribs.value;

    var blanketList = {
      Dapper: whichDapper ? whichDapper : null,
      Trend: whichTrend ? whichTrend : null,
      Naida: whichNaida ? whichNaida : null,
      Tula: whichTula ? whichTula : null
    };

    if(blanketList.Naida){
      if(ItsyNaida == 0){
        ItsyNaida++;
        client.messages.create({
          body: "Go buy your blanket now! Its in stock!",
          to: "SECRET",
          from: SECRET"
        }, function(err, data){
          if(err){
            console.log(err);
            console.log("Could not send the message for some reason");
          }else{
            console.log("Has been contacted");
          };
        })
        client.messages.create({
          body: "Go buy your blanket now! Its in stock!",
          to: "SECRET",
          from: "SECRET"
        }, function(err, data){
          if(err){
            console.log(err);
            console.log("Could not send the message for some reason");
          }else{
            console.log("Has been contacted");
          };
        })
      }
    };

    if(blanketList.Tula){
      if(ItsyTula == 0){
        ItsyTula++;
        client.messages.create({
          body: "Go buy your blanket now! Its in stock!",
          to: "SECRET",
          from: "SECRET"
        }, function(err, data){
          if(err){
            console.log(err);
            console.log("Could not send the message for some reason");
          }else{
            console.log("Has been contacted");
          };
        });
        client.messages.create({
          body: "Go buy your blanket now! Its in stock!",
          to: "+SECRET",
          from: "+SECRET"
        }, function(err, data){
          if(err){
            console.log(err);
            console.log("Could not send the message for some reason");
          }else{
            console.log("Has been contacted");
          };
        });
      }
    };

  }

  setTimeout(ItsySearch, 5000);

});

}


ItsySearch();
























































// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
