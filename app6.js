const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );

  if(isNaN(win)) win = 0;
  if(isNaN(total)) total = 0;

  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する

  if( cpu=='グー' && hand=='パー' ) judgement = '勝ち', win += 1;
  else if( cpu=='チョキ' && hand=='グー' ) judgement = '勝ち', win += 1;
  else if( cpu=='パー' && hand=='チョキ' ) judgement = '勝ち', win += 1;
  else if( cpu=='グー' && hand=='グー' ) judgement = 'あいこ';
  else if( cpu=='チョキ' && hand=='チョキ') judgement = 'あいこ';
  else if( cpu=='パー' && hand=='パー' ) judgement = 'あいこ';
  else if( cpu=='グー' && hand=='チョキ') judgement = '負け';
  else if( cpu=='チョキ' && hand=='パー' ) judgement = '負け';
  else if( cpu=='パー' && hand=='グー' ) judgement = '負け';

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/radio_janken", (req, res) => {
  let hand = req.query.radio;
  let win = Number( req.query.win );
  let total = Number( req.query.total );

  if(isNaN(win)) win = 0;
  if(isNaN(total)) total = 0;

  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する

  if( cpu=='グー' && hand=='パー' ) judgement = '勝ち', win += 1;
  else if( cpu=='チョキ' && hand=='グー' ) judgement = '勝ち', win += 1;
  else if( cpu=='パー' && hand=='チョキ' ) judgement = '勝ち', win += 1;
  else if( cpu=='グー' && hand=='グー' ) judgement = 'あいこ';
  else if( cpu=='チョキ' && hand=='チョキ') judgement = 'あいこ';
  else if( cpu=='パー' && hand=='パー' ) judgement = 'あいこ';
  else if( cpu=='グー' && hand=='チョキ') judgement = '負け';
  else if( cpu=='チョキ' && hand=='パー' ) judgement = '負け';
  else if( cpu=='パー' && hand=='グー' ) judgement = '負け';

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'radio_janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
