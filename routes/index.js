var express = require('express');
var stringify = require('json-stringify-safe');
var router = express.Router();

var client = require('twilio')("AC621078e1d207d81638d8e24c9dd658c9", "c721b3668e0418a0db7e89edb11263be");


var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var pageToVisit = "http://localhost:5000";
var itsyPage = "http://itsy-bitsy-bums.myshopify.com/collections/blankets-and-nursery/products/copy-of-tula-blanket-clever-set?variant=18323812801"

var abbyCounter = 0;
var itsyCounter = 0;

/* GET home page. */
router.get('/abbylist', function(req, res, next) {

  request(pageToVisit, function(error, response, body){
    console.log("Starting search now...");
    if(error){
      console.log("Error:  " + error);
    }

    // console.log("Status code: " + response.statusCode);

    if(response.statusCode === 200){
      var $ = cheerio.load(body);
      // console.log("Checking page now....")
      // console.log("Page title: " + $('title').text());
      var totalLabel = $("label");
      // console.log(totalLabel[0].children[0].data);
      // console.log(totalLabel[0].attribs.class);
      // console.log("Total Labels: " + totalLabel.length());

      if(totalLabel[0].attribs.class === "disabled"){
        res.send("In Stock!!!");
        if(abbyCounter == 0){
          abbyCounter++;
          client.messages.create({
            body: "Go buy your blanket now! Its in stock!",
            to: "+19089308704",
            from: "+19083602048"
          }, function(err, data){
            if(err){
              console.log("Could not send the message for some reason");
            }else{
              console.log("Has been contacted");
            };
          })
        }
      }else{
        res.send("Out of Stock");
      }

    }

  });



});


router.get('/itsybitsy', function(req, res, next){

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
            if(itsyCounter == 0){
                abbyCounter++;
                client.messages.create({
                    body: "Go buy your blanket now! Its in stock!",
                    to: "+19084209859",
                    from: "+19083602048"
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
                    to: "+19089308704",
                    from: "+19083602048"
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
            if(itsyCounter == 0){
                itsyCounter++;
                client.messages.create({
                    body: "Go buy your blanket now! Its in stock!",
                    to: "+19084209859",
                    from: "+19083602048"
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
                    to: "+19089308704",
                    from: "+19083602048"
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

        res.send(blanketList);
    }

  });

});


module.exports = router;


function searchLabels(){

}
