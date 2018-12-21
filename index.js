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
  .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function lineBot(req, res) {
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
  else if(command.match('[1~9]D'))
  {
    var count = command.slice(0,1);
    var dice = command.slice(3);
    var sum = 0;
    var i = 0;
    var resultA = '';
    var tmp = 0;
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
  else
  {
    console.log("no adaptive text : "+command);
  }
}