const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const client = new line.Client(config); // 追加

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/g/", (req, res) => res.json({ method: "こんにちは、getさん" }))
  .post("/p/", (req, res) => res.json({ method: "こんにちは、postさん" }))
  .post("/hook/", line.middleware(config), (req, res) => StellarKnights(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function StellarKnights(req, res) {
  res.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];
  console.log("event fire");
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    echoman(ev)
  }
  console.log("all event complete");
}
var buke_count = 0;
// 追加
async function echoman(ev) {
  const pro =  await client.getProfile(ev.source.userId);

  var command = ev.message.text;

  if(command.match('開始') || command.match('スタート'))
  {
    buke_count = 0;
    return client.replyMessage(ev.replyToken, {
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

    return client.replyMessage(ev.replyToken, {
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
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+resultA+')'
    })
  }
  else if(command.match('[0-9]{1,2}D10 c[0-9]'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var critical = command.slice(-1);
    var dice = 10;
    var isContinue = true;
    var ncount = 0;
    var max = 0;
    var sum = 0;
    if(critical < 2)
    {
      return client.replyMessage(ev.replyToken, {
        type: "text",
        text: "クリティカル値が2より下となっています。"
      })
    }
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
        if(tmp >= critical)
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
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum
    })
  }
  else if(command.match('[0-9]{1,2}D100'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 10;
    var result = '';
    for(var i = 0;i<count;i++){
      var first = Math.floor(Math.random() * dice);
      var second = Math.floor(Math.random() * dice);
      if(i != 0)
      {
        result += ',';
      }
      result += first.toString()+second.toString();
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+result
    })
  }
  else if(command.match('D100'))
  {
    var dice = 10;
    var first = Math.floor(Math.random() * dice);
    var second = Math.floor(Math.random() * dice);
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+first.toString()+second.toString()
    })
  }
  else if(command.match('[0-9]{1,2}D4'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 4;
    var result = '';
    var sum = 0;
    for(var i = 0;i<count;i++){
      var first = Math.floor(Math.random() * dice)+1;
      if(i != 0)
      {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+result+')'
    })
  }
  else if(command.match('[0-9]{1,2}D12'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 12;
    var result = '';
    var sum = 0;
    for(var i = 0;i<count;i++){
      var first = Math.floor(Math.random() * dice)+1;
      if(i != 0)
      {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+result+')'
    })
  }
  else if(command.match('[0-9]{1,2}D8'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 8;
    var result = '';
    var sum = 0;
    for(var i = 0;i<count;i++){
      var first = Math.floor(Math.random() * dice)+1;
      if(i != 0)
      {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+result+')'
    })
  }
  else if(command.match('[0-9]{1,2}D20'))
  {
    var index   = command.indexOf('D');
    var count = command.substring(0,index);
    var dice = 20;
    var result = '';
    var sum = 0;
    for(var i = 0;i<count;i++){
      var first = Math.floor(Math.random() * dice)+1;
      if(i != 0)
      {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:'+sum+'('+result+')'
    })
  }

  else
  {
    console.log("no adaptive text : "+command);
  }
}