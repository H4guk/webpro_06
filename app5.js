const { name } = require("ejs");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.redirect('/public/keiyo_add.html');
  res.render('db2', { data: station });
});

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', { data: station2 });
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

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
  judgement = '勝ち';
  win += 1;
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

// -----------------------------------------------------------------------------

let fgo = [
  { id:1, name:" 混沌の爪 ", quest:" ウル ", place:" 1-7 バビロニア ", composition:"3-3-3", number:"3482 個 "},
  { id:2, name:" 蛮神の心臓 ", quest:" 新宿御苑 ", place:" 1.5-1 新宿 ", composition:"3-2-1", number:"3147 個 "},
  { id:3, name:" 竜の逆鱗 ", quest:" 蛇竜のいたずら ", place:" オーディールコール ", composition:"3-1-2", number:"2627 個 "},
  { id:4, name:" 精霊根 ", quest:" 外周部 ", place:" 奏章1 ペーパームーン ", composition:"3-3-3", number:"2686 個 "},
  { id:5, name:" 戦馬の幼角 ", quest:" イニシエートポイント ", place:" 2-4 ユガクシェートラ ", composition:"3-3-2", number:"2254 個 "},
  { id:6, name:" 血の涙石 ", quest:" 新宿2丁目 ", place:" 1.5-1 新宿 ", composition:"3-3-1", number:"3196 個 "},
  { id:7, name:" 黒獣脂 ", quest:" 七条二坊 ", place:" 2-5.5 平安京 ", composition:"3-2-2", number:"2736 個 "},
  { id:8, name:" 封魔のランプ ", quest:" 神秘主義者と魂の故郷 ", place:" オーディールコール ", composition:"2-2-1", number:"3001 個 "},
  { id:9, name:" 智慧のスカラベ ", quest:" デイモス島 ", place:" 2-5 アトランティス ", composition:"3-3-3", number:"2296 個 "},
  { id:10, name:" 原初の産毛 ", quest:" 罪人の戦場 ", place:" 奏章4 トリニティメタトロニオス ", composition:"3-3-3", number:"3320 個 "},
  { id:11, name:" 呪獣胆石 ", quest:" 荒川の原 ", place:" 1.5-3 下総国 ", composition:"3-1-3", number:"2067 個 "},
  { id:12, name:" 奇奇神酒 ", quest:" ソソアウワキ ", place:" 2-7 ナウイミクトラン ", composition:"1-1-1", number:"2629 個 "},
  { id:13, name:" 暁光炉心 ", quest:" 収容所 ", place:" 2-3 シン ", composition:"2-3-2", number:"4153 個 "},
  { id:14, name:" 九十九鏡 ", quest:" 裏山(戦戦恐恐) ", place:" 1.5-3 下総国 ", composition:"2-3-2", number:"2948 個 "},
  { id:15, name:" 真理の卵 ", quest:" 稲荷神社 ", place:" 2-5.5 平安京 ", composition:"3-3-2", number:"3388 個 "},
  { id:16, name:" 煌星のカケラ ", quest:" 生産部本部 ", place:" 奏章1 ペーパームーン ", composition:"3-3-1", number:"3641 個 "},
  { id:17, name:" 悠久の実 ", quest:" 久遠の微笑 ", place:" オーディールコール ", composition:"1-1-0", number:"3743 個 "},
  { id:18, name:" 鬼炎鬼灯 ", quest:" 大宮大路 ", place:" 2-5.5 平安京 ", composition:"3-1-1", number:"3126 個 "},
  { id:19, name:" 黄金釜 ", quest:" 新宿御苑 ", place:" 奏章2 イド ", composition:"1-2-1", number:"657 個 "},
  { id:20, name:" 月光核 ", quest:" 月光採掘場 ", place:" オーディールコール ", composition:"3-1-0", number:"389 個 "},
  { id:21, name:" 天命の聖水 ", quest:" 永遠の氷牢 ", place:" 奏章4 トリニティメタトロニオス ", composition:"1-3-1", number:"211 個 "},
  { id:22, name:" 遺霊箱 ", quest:" 冠位研鑽戦 ", place:" 冠位戴冠戦 ", composition:"1-0-0", number:"325 個 "}
]

// 一覧表示
app.get("/fgo", (req, res) => {
  const sortedFGO = [...fgo].sort((a, b) => a.id - b.id);
  res.render("fgo", { data: sortedFGO });
});

// 詳細表示
app.get("/fgo/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = fgo.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('fgo_detail', { data: detail });
});

// 追加機能
app.get("/fgo_add", (req, res) => {
  const newdata = {
    id: Number(req.query.id),
    name: req.query.name,
    quest: req.query.quest,
    place: req.query.place,
    composition: req.query.composition,
    number: req.query.number
  };

  fgo.push(newdata);
  res.redirect("/fgo");
});

// 削除機能
app.get("/fgo_delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = fgo.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('fgo_delete', { data: detail });
});

// 削除の確認
app.get("/fgo/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = fgo.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send("削除対象が見つかりません");
  }

  fgo.splice(index, 1);
  res.redirect("/fgo");
});

// 編集機能
app.get("/fgo_edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = fgo.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render("fgo_edit", { data: detail });
});

// 更新機能
app.get("/fgo/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = fgo.find(b => b.id === id);

  if (!target) {
    return res.status(404).send("更新対象が見つかりません");
  }

  target.name = req.query.name;
  target.quest = req.query.quest;
  target.place = req.query.place;
  target.composition = req.query.composition;
  target.number = req.query.number;

  res.redirect("/fgo");
});

// -----------------------------------------------------------------------------

let boss = [
  { id:1, name:"猛る金色", drop1:"紫武器", drop2:"紫ヘルム", drop3:"紫首飾り", place:"アステリア平原 偵察兵見張り屋右側"},
  { id:2, name:"フロストオーガ", drop1:"紫武器", drop2:"紫鎧", drop3:"紫指輪", place:"アステリア平原 古代都市ヴィル"},
  { id:3, name:"フレイムオーガ", drop1:"紫武器", drop2:"紫腕輪-左", drop3:"紫腕輪-右", place:"アステリア平原 上陸戦跡"},
  { id:4, name:"ゴーストカニグモ", drop1:"金武器", drop2:"金ヘルム", drop3:"金首飾り", place:"アステルリーズ地下集落"},
  { id:5, name:"異国の山賊長ヒグマ", drop1:"金武器", drop2:"金鎧", drop3:"金指輪", place:"アステリア平原 ミンスターホルン市街地西部 山賊野営地"},
  { id:6, name:"ヴェノミーンの巣", drop1:"金武器", drop2:"金ガントレット", drop3:"金耳飾り", place:"アステルリーズ地下集落"},
  { id:7, name:"ムークボス", drop1:"金武器", drop2:"金靴", drop3:"金護符", place:"アステリア平原 カナリア族集落南部 モンスターキャンプ"},
  { id:8, name:"鉄牙", drop1:"金武器", drop2:"金腕輪-左", drop3:"金腕輪-右", place:"風鳴りの峡谷"},
  { id:9, name:"嵐のキングゴブリン", drop1:"金武器", drop2:"金ヘルム", drop3:"金首飾り", place:"風鳴りの峡谷"},
  { id:10, name:"サンダーオーガ", drop1:"金武器", drop2:"金鎧", drop3:"金指輪", place:"アステリア平原 暗霧要塞エリア"},
  { id:11, name:"ヘヴンスカイ", drop1:"金武器", drop2:"金ガントレット", drop3:"金耳飾り", place:"黒藍の深窟中"},
  { id:12, name:"キングギルミー", drop1:"金武器", drop2:"金靴", drop3:"金護符", place:"黒藍の深窟中"},
  { id:13, name:"キングゴブリン", drop1:"金武器", drop2:"金腕輪-左", drop3:"金腕輪-右", place:"アステリア平原北部 花明かりの森"},
  { id:14, name:"キングムーク", drop1:"金武器", drop2:"-", drop3:"-", place:"アステリア平原北部 雨止まぬ森"}
]

// 一覧表示
app.get("/boss", (req, res) => {
  const sortedBoss = [...boss].sort((a, b) => a.id - b.id);
  res.render("boss", { data: sortedBoss });
});

// 詳細表示
app.get("/boss/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = boss.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('boss_detail', { data: detail });
});

// 追加機能
app.get("/boss_add", (req, res) => {
  const newdata = {
    id: Number(req.query.id),
    name: req.query.name,
    drop1: req.query.drop1,
    drop2: req.query.drop2,
    drop3: req.query.drop3,
    place: req.query.place
  };

  boss.push(newdata);
  res.redirect("/boss");
});

// 削除機能
app.get("/boss_delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = boss.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('boss_delete', { data: detail });
});

// 削除の確認
app.get("/boss/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = boss.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send("削除対象が見つかりません");
  }

  boss.splice(index, 1);
  res.redirect("/boss");
});

// 編集機能
app.get("/boss_edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = boss.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render("boss_edit", { data: detail });
});

// 更新機能
app.get("/boss/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = boss.find(b => b.id === id);

  if (!target) {
    return res.status(404).send("更新対象が見つかりません");
  }

  target.name = req.query.name;
  target.drop1 = req.query.drop1;
  target.drop2 = req.query.drop2;
  target.drop3 = req.query.drop3;
  target.place = req.query.place;

  res.redirect("/boss");
});

// -----------------------------------------------------------------------------


let music = [
  { id:1, year:2000, name:" 第48回全日本吹奏楽コンクール ", music1:" 道祖神の詩 ", music2:" をどり唄 ", music3:" 胎動の時代-吹奏楽のために ", music4:" 吹奏楽の為の序曲 ", music5:" - "},
  { id:2, year:2001, name:" 第49回全日本吹奏楽コンクール ", music1:" 式典のための行進曲「栄光をたたえて」 ", music2:" 平和への行列 ", music3:" あの丘をこえて ", music4:" 行進曲「SLが行く」 ", music5:" - "},
  { id:3, year:2002, name:" 第50回全日本吹奏楽コンクール ", music1:" 吹奏楽のためのラメント ", music2:" 追想 〜ある遠い日の〜 ", music3:" ミニシンフォニー 変ホ長調 ", music4:" 吹奏楽のためのラプソディア ", music5:" - "},
  { id:4, year:2003, name:" 第51回全日本吹奏楽コンクール ", music1:" ウィナーズ―吹奏楽のための行進曲 ", music2:" イギリス民謡による行進曲 ", music3:" 行進曲「虹色の風」 ", music4:" マーチ「ベスト・フレンド」 ", music5:" マーチ「列車で行こう」 "},
  { id:5, year:2004, name:" 第52回全日本吹奏楽コンクール ", music1:" 吹奏楽のための「風之舞」 ", music2:" エアーズ ", music3:" 祈りの旅 ", music4:" 鳥たちの神話 ", music5:" サード "},
  { id:6, year:2005, name:" 第53回全日本吹奏楽コンクール ", music1:" パクス・ロマーナ ", music2:" マーチ「春風」 ", music3:" ストリート・パフォーマーズ・マーチ ", music4:" サンライズマーチ ", music5:" リベラメンテ 吹奏楽による "},
  { id:7, year:2006, name:" 第54回全日本吹奏楽コンクール ", music1:" 架空の伝説のための前奏曲 ", music2:" 吹奏楽のための一章 ", music3:" パルセイション ", music4:" 海へ…吹奏楽の為に ", music5:" 風の密度 "},
  { id:8, year:2007, name:" 第55回全日本吹奏楽コンクール ", music1:" ピッコロマーチ ", music2:" コンサートマーチ「光と風の通り道」 ", music3:" 憧れの街 ", music4:" マーチ「ブルースカイ」 ", music5:" ナジム・アラビー "},
  { id:9, year:2008, name:" 第56回全日本吹奏楽コンクール ", music1:" ブライアンの休日 ", music2:" マーチ「晴天の風」 ", music3:" セリオーソ ", music4:" 天馬の道 〜吹奏楽のために ", music5:" 火の断章 "},
  { id:10, year:2009, name:" 第57回全日本吹奏楽コンクール ", music1:" 16世紀のシャンソンによる変奏曲 ", music2:" コミカル★パレード ", music3:" ネストリアン・モニュメント ", music4:" マーチ「青空と太陽」 ", music5:" 躍動する魂　〜吹奏楽のための "},
  { id:11, year:2010, name:" 第58回全日本吹奏楽コンクール ", music1:" 迷走するサラバンド ", music2:" オーディナリー・マーチ ", music3:" 吹奏楽のための民謡「うちなーのてぃだ」 ", music4:" 汐風のマーチ ", music5:" 吹奏楽のためのスケルツォ 第2番 ≪夏≫ "},
  { id:12, year:2011, name:" 第59回全日本吹奏楽コンクール ", music1:" マーチ「ライヴリー アヴェニュー」 ", music2:" 天国の島 ", music3:" シャコンヌ S ", music4:" 南風のマーチ ", music5:" 「薔薇戦争」より　戦場にて "},
  { id:13, year:2012, name:" 第60回全日本吹奏楽コンクール ", music1:" さくらのうた ", music2:" 	行進曲「よろこびへ歩きだせ」 ", music3:" 吹奏楽のための綺想曲「じゅげむ」 ", music4:" 行進曲「希望の空」 ", music5:" 香り立つ刹那 "},
  { id:14, year:2013, name:" 第61回全日本吹奏楽コンクール ", music1:" 勇者のマズルカ ", music2:" 祝典行進曲「ライジング・サン」 ", music3:" 復興への序曲「夢の明日に」 ", music4:" エンターテインメント・マーチ ", music5:" 流沙 "},
  { id:15, year:2014, name:" 第62回全日本吹奏楽コンクール ", music1:" 最果ての城のゼビア ", music2:" 行進曲「勇気のトビラ」 ", music3:" 「斎太郎節」の主題による幻想 ", music4:" コンサートマーチ「青葉の街で」 ", music5:" きみは林檎の樹を植える "},
  { id:16, year:2015, name:" 第63回全日本吹奏楽コンクール ", music1:" 天空の旅 －吹奏楽のための譚詩－ ", music2:" マーチ「春の道を歩こう」 ", music3:" 秘儀III -旋回舞踊のためのヘテロフォニー ", music4:" マーチ「プロヴァンスの風」 ", music5:" 暁闇の宴 "},
  { id:17, year:2016, name:" 第64回全日本吹奏楽コンクール ", music1:" マーチ・スカイブルー・ドリーム ", music2:" スペインの市場で ", music3:" ある英雄の記憶 〜「虹の国と氷の国」より ", music4:" マーチ「クローバー グラウンド」 ", music5:" 焔 "},
  { id:18, year:2017, name:" 第65回全日本吹奏楽コンクール ", music1:" スケルツァンド ", music2:" マーチ・シャイニング・ロード ", music3:" インテルメッツォ ", music4:" マーチ「春風の通り道」 ", music5:" メタモルフォーゼ〜吹奏楽のために "},
  { id:19, year:2018, name:" 第66回全日本吹奏楽コンクール ", music1:" 古き森の戦記 ", music2:" マーチ・ワンダフル・ヴォヤージュ ", music3:" 吹奏楽のための「ワルツ」 ", music4:" コンサート・マーチ「虹色の未来へ」 ", music5:" エレウシスの祭儀 "},
  { id:20, year:2019, name:" 第67回全日本吹奏楽コンクール ", music1:" 「あんたがたどこさ」の主題による幻想曲 ", music2:" マーチ「エイプリル・リーフ」 ", music3:" 行進曲「春」 ", music4:" 行進曲「道標の先に」 ", music5:" ビスマス・サイケデリア I "},
  { id:21, year:2020, name:" コロナにより中止 ", music1:" - ", music2:" - ", music3:" - ", music4:" - ", music5:" - "},
  { id:22, year:2021, name:" 第69回全日本吹奏楽コンクール ", music1:" トイズ・パレード ", music2:" 龍潭譚 ", music3:" 僕らのインベンション ", music4:" 吹奏楽のための「エール・マーチ」 ", music5:" 吹奏楽のための「幻想曲」－アルノルト・シェーンベルク讃 "},
  { id:23, year:2022, name:" 第70回全日本吹奏楽コンクール ", music1:" やまがたふぁんたじぃ〜吹奏楽のための〜 ", music2:" マーチ「ブルー・スプリング」 ", music3:" ジェネシス ", music4:" サーカスハットマーチ ", music5:" 憂いの記憶-吹奏楽のための "},
  { id:24, year:2023, name:" 第71回全日本吹奏楽コンクール ", music1:" 行進曲「煌めきの朝」 ", music2:" ポロネーズとアリア 〜吹奏楽のために〜 ", music3:" レトロ ", music4:" マーチ「ペガサスの夢」 ", music5:" - "},
  { id:25, year:2024, name:" 第72回全日本吹奏楽コンクール ", music1:" 行進曲 「勇気の旗を掲げて」 ", music2:" 風がきらめくとき ", music3:" メルヘン ", music4:" フロンティア・スピリット ", music5:" - "},
  { id:26, year:2025, name:" 第73回全日本吹奏楽コンクール ", music1:" 祝い唄と踊り唄による幻想曲 ", music2:" ステップ、スキップ、ノンストップ（順次進行によるカプリッチョ） ", music3:" マーチ「メモリーズ・リフレイン」 ", music4:" Rhapsody ～ Eclipse ", music5:" - "},
  { id:27, year:2026, name:" 第74回全日本吹奏楽コンクール ", music1:" 夕映えの丘 ", music2:" あつまれ おもちゃのマルチャ！ ", music3:" 管楽器のためのフィナーレ ", music4:" ザ・ガーズ ", music5:" - "}
]

// 一覧表示
app.get("/music", (req, res) => {
  const sortedMusic = [...music].sort((a, b) => a.id - b.id);
  res.render("music", { data: sortedMusic });
});

// 詳細表示
app.get("/music/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = music.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('music_detail', { data: detail });
});

// 追加機能
app.get("/music_add", (req, res) => {
  const newdata = {
    id: Number(req.query.id),
    year: Number(req.query.year),
    name: req.query.name,
    music1: req.query.music1,
    music2: req.query.music2,
    music3: req.query.music3,
    music4: req.query.music4,
    music5: req.query.music5
  };

  music.push(newdata);
  res.redirect("/music");
});

// 削除機能
app.get("/music_delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = music.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render('music_delete', { data: detail });
});

// 削除の確認
app.get("/music/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = music.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send("削除対象が見つかりません");
  }

  music.splice(index, 1);
  res.redirect("/music");
});

// 編集機能
app.get("/music_edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const detail = music.find(b => b.id === id);

  if (!detail) {
    return res.status(404).send("詳細が見つかりません");
  }

  res.render("music_edit", { data: detail });
});

// 更新機能
app.get("/music/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = music.find(b => b.id === id);

  if (!target) {
    return res.status(404).send("更新対象が見つかりません");
  }

  target.year = req.query.year;
  target.name = req.query.name;
  target.music1 = req.query.music1;
  target.music2 = req.query.music2;
  target.music3 = req.query.music3;
  target.music4 = req.query.music4;
  target.music5 = req.query.music5;

  res.redirect("/music");
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
