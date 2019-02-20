const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
var fs = require('fs');
var os = require('os');

const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};

const client = new line.Client(config); // 追加

var server = express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/g/", (req, res) => getFile(req, res))
  .post("/hook/", line.middleware(config), (req, res) => Bot(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);

function getFile(req, res) {
  var path = os.tmpdir() + '/' + req.query.file;
  res.sendFile(path);
  console.log(path);
}


function Bot(req, res) {
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
var id = 'U0c2b0ec852da1f79690a16c776bfa624';
// 追加
async function echoman(ev) {

  var command = ev.message.text;
  const userpro = await client.getProfile(ev.source.userId);
  var user = userpro.displayName;
  io.emit("talk", user + "：" + ev.message.text);
  if (command.match('セッション開始')) {
    id = ev.source.groupId;

    return client.replyMessage(ev.replyToken,
      [
        {
          type: "text",
          text: "セッションを開始します。"
        },
        {
          type: "text",
          text: "GMは以下のURLにアクセスしてください。ここでマップの公開などを行うことができます。"
        },
        {
          type: "text",
          text: "https://immense-atoll-44982.herokuapp.com"
        }
      ]
    )
  }
  else if(command.match('クトゥルフ'))
  {
    var STR = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    var CON = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    var POW = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    var DEX = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    var APP = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    var SIZ = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 9;
    var INT = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 9;
    var EDU = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 6;
    var db = STR+SIZ;
    var DB = '-';
    if(db <= 12)DB='-1D6';
    else if(db <= 16)DB='-1D4';
    else if(db <= 24)DB='0';
    else if(db <= 32)DB='+1D4';
    else if(db <= 36)DB='+1D6';
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'キャラを作成します。\nSTR : '+STR+'\nCON : '+CON+'\nPOW : '+POW+'\nDEX : '+DEX+'\nAPP : '+APP+'\nSIZ : '
      +SIZ+'\nINT : '+INT+'\nEDU : '+EDU+'\n\nSAN : '+POW*5+'\n幸運 : '+POW*5+'\nアイデア : '+INT*5+'\n知識 : '+EDU*5+'\n耐久力 : '+(CON+SIZ)/2+'\nマジックポイント : '+POW+'\n職業技能ポイント : '+EDU*20
      +'\n趣味技能ポイント : '+INT*10+'\nダメージボーナス : '+DB
    })
  }
  else if (command.match('スタート')) {
    buke_count = 0;
    io.emit("talk", "Bot：ブーケのカウントを開始します。");
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `ブーケのカウントを開始します。`
    })
  }
  else if (command.match('ブーケ')) {
    buke_count += 1;
    return
  }
  else if (command.match('ストップ')) {

    io.emit("talk", "Bot：ブーケのカウントを終了します。\nブーケの個数は" + buke_count + 'でした。');
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `ブーケのカウントを終了します。\nブーケの個数は` + buke_count + 'でした。'
    })
  }
  else if(command.match('[0-9]{1,2}D66'))
  {
    let dice = 6;
    var ret = "(";
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    for(i = 0;i<count;i++)
    {
      if(i != 0)
      {
        ret += ',';
      }
      var D60 = Math.floor(Math.random() * dice) + 1;
      var D61 = Math.floor(Math.random() * dice) + 1;
      ret += D60.toString() + D61.toString();
    }
    ret += ')';
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + ret
    })
  }
  else if(command.match('D66'))
  {
    let dice = 6;
    var D60 = Math.floor(Math.random() * dice) + 1;
    var D61 = Math.floor(Math.random() * dice) + 1;

    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + D60.toString() + D61.toString()
    })

  }
  else if (command.match('[0-9]{1,2}D6')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 6;
    var sum = 0;
    var i = 0;
    var resultA = '';
    var tmp = 0;
    console.log('command : ' + command + ' count : ' + count + ' dice : ' + dice);
    for (i = 0; i < count; i++) {
      tmp = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        resultA += ',';
      }
      resultA += tmp.toString();
      sum += tmp;
    }
    io.emit("talk", "Bot：" + 'result:' + sum + '(' + resultA + ')')
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '(' + resultA + ')'
    })
  }
  else if(command.match('[0-9]{1,2}D10'))
  {
    var index = command.indexOf('D');
    var count = command.substring(0, index);

    let dice = 10;
    var sum = 0;
    var D10 = Math.floor(Math.random() * dice) + 1;
    var ret = '';
    for (i = 0; i < count; i++) {
      tmp = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        ret += ',';
      }
      ret += tmp.toString();
      sum += tmp;
    }
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '('+ret+')'
    })

  }
  else if (command.match('[0-9]{1,2}D10 c[0-9]')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var critical = command.slice(-1);
    var dice = 10;
    var isContinue = true;
    var ncount = 0;
    var max = 0;
    var sum = 0;
    if (critical < 2) {
      return client.replyMessage(ev.replyToken, {
        type: "text",
        text: "クリティカル値が2より下となっています。"
      })
    }
    console.log('command : ' + command + ' count : ' + count + ' c : ' + critical);
    while (isContinue) {
      max = -1;
      for (var i = 0; i < count; i++) {
        var tmp = Math.floor(Math.random() * dice);
        if (max < tmp) {
          max = tmp;
        }
        if (tmp >= critical) {
          ncount++;
        }
      }
      if (ncount > 0) {
        sum += 10;
        console.log("next stage");
      }
      else {
        sum += max;
        console.log("end stage");
        isContinue = false;
      }
      count = ncount;
      ncount = 0;
    }
    io.emit("talk", "Bot：result:" + sum);
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum
    })
  }
  else if(command.match('D10'))
  { 
    let dice = 10;
    var D10 = Math.floor(Math.random() * dice) + 1;
    
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + D10.toString()
    })
  }
  else if (command.match('[0-9]{1,2}D100')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 10;
    var result = '';
    for (var i = 0; i < count; i++) {
      var first = Math.floor(Math.random() * dice);
      var second = Math.floor(Math.random() * dice);
      if (i != 0) {
        result += ',';
      }
      result += first.toString() + second.toString();
    }
    io.emit("talk", "Bot：" + 'result:' + result);
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + result
    })
  }
  else if (command.match('D100')) {
    var dice = 10;
    var first = Math.floor(Math.random() * dice);
    var second = Math.floor(Math.random() * dice);
    io.emit("talk", "Bot：" + 'result:' + first.toString() + second.toString());
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + first.toString() + second.toString()
    })
  }
  else if (command.match('[0-9]{1,2}D4')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 4;
    var result = '';
    var sum = 0;
    for (var i = 0; i < count; i++) {
      var first = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    io.emit("talk", "Bot：" + 'result:' + sum + '(' + result + ')')
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '(' + result + ')'
    })
  }
  else if(command.match('D4'))
  {
    var dice = 4;
    var d4 = Math.floor(Math.random() * dice) + 1;
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + d4.toString()
    })
  }
  else if (command.match('[0-9]{1,2}D12')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 12;
    var result = '';
    var sum = 0;
    for (var i = 0; i < count; i++) {
      var first = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    io.emit("talk", "Bot：" + 'result:' + sum + '(' + result + ')')
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '(' + result + ')'
    })
  }
  else if(command.match('D12'))
  {
    let dice = 12;
    var D12 = Math.floor(Math.random() * dice) + 1;
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + D12.toString()
    })
  }
  else if (command.match('[0-9]{1,2}D8')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 8;
    var result = '';
    var sum = 0;
    for (var i = 0; i < count; i++) {
      var first = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    io.emit("talk", "Bot：" + 'result:' + sum + '(' + result + ')')
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '(' + result + ')'
    })
  }
  else if(command.match('D8'))
  {
    let dice = 8;
    var D8 = Math.floor(Math.random() * dice) + 1;
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + D8.toString()
    })
  }
  else if (command.match('[0-9]{1,2}D20')) {
    var index = command.indexOf('D');
    var count = command.substring(0, index);
    var dice = 20;
    var result = '';
    var sum = 0;
    for (var i = 0; i < count; i++) {
      var first = Math.floor(Math.random() * dice) + 1;
      if (i != 0) {
        result += ',';
      }
      result += first.toString();
      sum += first;
    }
    io.emit("talk", "Bot：" + 'result:' + sum + '(' + result + ')')
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + sum + '(' + result + ')'
    })
  }
  else if(command.match('D20'))
  {
    let dice = 8;
    var D20 = Math.floor(Math.random() * dice) + 1;
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: 'result:' + D20.toString()
    })
  }
  else {
    console.log("no adaptive text : " + command);
  }
}

io.on("connection", (sock) => {
  console.log("connection open");
  sock.on("dice", (res) => {
    io.emit("dice", "1");
  });
  sock.on("image", (res) => {
    var uploadData = res.file;
    var uploadName = res.name;
    var writePath = os.tmpdir() + '/' + uploadName;
    console.log("recv image event");

    var writeStream = fs.createWriteStream(writePath);
    writeStream.on('drain', function () { })
      .on('error', function (exception) {
        //エラー処理
        console.log("exception:" + exception);
      })
      .on('close', function () {
        client.pushMessage(id,
          [{
            type: "text",
            'text': '画像を送信します。'
          }, {
            type: "image",
            originalContentUrl: "https://immense-atoll-44982.herokuapp.com/g/?file=" + uploadName,
            previewImageUrl: "https://immense-atoll-44982.herokuapp.com/g/?file=" + uploadName
          }])
          io.emit("talk","GM：マップを公開しました。ファイル名："+uploadName);
      })
      .on('pipe', function (src) { });

    writeStream.write(uploadData, 'binary');//バイナリでお願いする
    writeStream.end();
  });

  sock.on("talk",(res)=>{
    client.pushMessage(id,{
      type:"text",
      text:"GM->"+res
    });
    io.emit("talk","GM："+res);
  })
})