const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const configStellar = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const configDX = {
  channelAccessToken: process.env.DX_ACCESS,
  channelSecret: process.env.DX_SECRET
}
const Knights = new line.Client(configStellar); // 追加
const DX = new line.Client(configDX);

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/g/", (req, res) => res.json({ method: "こんにちは、getさん" }))
  .post("/p/", (req, res) => res.json({ method: "こんにちは、postさん" }))
  .post("/SK/", line.middleware(Knights), (req, res) => StellarKnights(req, res))
  .post("/DX/",line.middleware(DX),(req,res) => DoubleCross(req,res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


function StellarKnights(req, res) {
  res.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];
  console.log("event fire");
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    Stellar(ev)
  }
  console.log("all event complete");
}
var buke_count = 0;
// 追加
async function Stellar(ev) {
  const pro =  await Knights.getProfile(ev.source.userId);

  var command = ev.message.text;

  if(command.match('開始') || command.match('スタート'))
  {
    buke_count = 0;
    return Knights.replyMessage(ev.replyToken, {
      type: "text",
      text: `ブーケのカウントを開始します。`
    })
  }
  else if(command.match('ブーケ'))
  {
    buke_count += 1;
    return
  }
  else if(command.match('ストップ') || command.match('終了'))
  {

    return Knights.replyMessage(ev.replyToken, {
      type: "text",
      text: `ブーケのカウントを終了します。\nブーケの個数は`+buke_count+'でした。'
    })
  }
  else if(command.match('[0-9]{1,2}D6'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 6;
    var sum = 0;
    var i = 0;
    var resultA = '';
    var tmp = 0;
    console.log('command : '+command+' count : '+count + ' dice : '+dice);
    for(i=0;i<count;i++)
    {
      tmp = Math.floor(Math.random() * dice)+1;
      if(i != 0)
      {
        resultA+=',';
      }
      resultA += tmp.toString();
      sum += tmp;
    }
    return Knights.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+resultA+')'
    })
  }
  else if(command.match('[0-9]{1,2}D10 c[0-9]'))
  {
    var xx = command.match('[0-9]{1,2}D10 c[0-9]');
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var critical = command.slice(-1);
    var dice = 10;
    var isContinue = true;
    var ncount = 0;
    var max = 0;
    var sum = 0;
    console.log('command : '+command+' count : '+count + ' c : '+critical);
    while(isContinue)
    {
      max = -1;
      for(var i = 0;i<count;i++)
      {
        var tmp = Math.floor(Math.random() * dice);
        if(max < tmp)
        {
          max = tmp;
        }
        if(tmp > critical)
        {
          ncount++;
        }
      }
      if(ncount > 0)
      {
        sum += 10;
        console.log("next stage");
      }
      else
      {
        sum += max;
        console.log("end stage");
        isContinue = false;
      }
      count = ncount;
      ncount = 0;
    }
    return Knights.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum
    })
  }
  else
  {
    console.log("no adaptive text : "+command);
  }
}

function DoubleCross(req,res)
{
  es.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];
  console.log("event fire");
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    Cross(ev)
  }
  console.log("all event complete");
}

async function Cross(ev)
{
  const pro =  await Knights.getProfile(ev.source.userId);

  var command = ev.message.text;
  if(command.match('[0-9]{1,2}D10 c[0-9]'))
  {
    var xx = command.match('[0-9]{1,2}D10 c[0-9]');
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var critical = command.slice(-1);
    var dice = 10;
    var isContinue = true;
    var ncount = 0;
    var max = 0;
    var sum = 0;
    console.log('command : '+command+' count : '+count + ' c : '+critical);
    while(isContinue)
    {
      max = -1;
      for(var i = 0;i<count;i++)
      {
        var tmp = Math.floor(Math.random() * dice);
        if(max < tmp)
        {
          max = tmp;
        }
        if(tmp > critical)
        {
          ncount++;
        }
      }
      if(ncount > 0)
      {
        sum += 10;
        console.log("next stage");
      }
      else
      {
        sum += max;
        console.log("end stage");
        isContinue = false;
      }
      count = ncount;
      ncount = 0;
    }
    return DX.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum
    })
  }
}