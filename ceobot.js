var TelegramBot = require('node-telegram-bot-api');
var Promise = require('bluebird');
var token = "289503728:AAFpawb2HzOyX1S-oNbjF2vBg5T0PFAN-gM";
var thesaurus = require("thesaurus");
var inlineQuery="";
var inlineID=0;
var options = {
  polling: {
    interval: 5000,
    timeout: 20
  }	
};
var bot = new TelegramBot(token, options);

bot.on('inline_query', function (msg) {
  inlineID=msg.id;
  inlineQuery=msg.query;  
  // photo can be: a file path, a stream or a Telegram file_id
  var message=thesaurus.find(inlineQuery)
  var x=thesaurus.find(inlineQuery).length;
  var i=0;
  var length=0;
  var messagetextobj={}
  var results=[];

  function obj(title,id){
    this.type='article';
    this.title=title;
    this.id=id.toString();
    var obj={}
    obj.message_text=title;
    this.input_message_content=obj;
    };      
    if (message.length>50){
	    length=40;
    }
    else{
	  length=message.length;
    }
    while(i<length){ 	
 	  results[i]=new obj(message[i],i);
 	  i=i+1;	
    }
//console.log(message)
    if (message.length>0){ bot.answerInlineQuery(inlineID.toString(), results)}
});

