/* emoji-translate
Translates your sentences into emoji!
Jack Margeson, 2019 */

// pull enviroment variables
const SLACK_TOKEN = process.env.SLACK_TOKEN;

// requirements
const slackBot = require("slackbots");

// node.js server
http = require("http");
handle = (req, res) => {
  res.end("emoji-translate-bot: translates your sentences into emoji!");
};
server = http.createServer(handle);
server.listen(process.env.PORT || 5000);

// create bot user
const bot = new slackBot({
  token: SLACK_TOKEN,
  name: "emoji-translate"
});

// error handler
bot.on("error", err => {
  console.log(err);
  bot.postMessageToUser(
    "margeson.jack",
    "An error has occured. Check the console log for more details."
  );
});

// startup function
bot.on("start", () => {
  // bot.postMessageToChannel('emoji-translate', 'Hello, world!');
  // bot.postMessageToUser('margeson.jack', 'emoji-translate is now online.');
  console.log(
    "emoji-translate is now online." + "\n" + "Searching for messages..."
  );
});

// message handler
bot.on("message", data => {
  if (
    data.subtype == "bot_message" || // excludes bot messages
    data.type !== "message" || // excludes non-messages
    data.thread_ts != undefined // excludes threaded messages
  ) {
    return;
  } else if (data.text.startsWith("<@UM4MZNRGU> ")) {
    info(data);
    translate(data);
  }
});

function info(data) {
  console.log(
    "emoji-translate" +
      "\n" +
      "Bot's user ID: " +
      "id" +
      "\n" +
      "---------------" +
      "\n"
  );
  console.log(data);
}

function translate(data) {
  text = data.text
    .replace("<@UM4MZNRGU> ", "")
    .replace(/ /g, "     ")
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase();
  new_text = text.split("");
  for (var i = 0; i < new_text.length; i++) {
    switch (new_text[i]) {
      case "a":
        new_text[i] = new_text[i].replace(/a/, ":adobe:");
        break;
      case "b":
        new_text[i] = new_text[i].replace(/b/, ":btc:");
        break;
      case "c":
        new_text[i] = new_text[i].replace(/c/, ":stone_space:");
        break;
      case "d":
        new_text[i] = new_text[i].replace(/d/, ":dtrain:");
        break;
      case "e":
        new_text[i] = new_text[i].replace(/e/, ":edge:");
        break;
      case "f":
        new_text[i] = new_text[i].replace(/f/, ":facebook:");
        break;
      case "g":
        new_text[i] = new_text[i].replace(/g/, ":google:");
        break;
      case "h":
        new_text[i] = new_text[i].replace(/h/, ":hack_club:");
        break;
      case "i":
        new_text[i] = new_text[i].replace(/i/, ":incredibles:");
        break;
      case "j":
        new_text[i] = new_text[i].replace(/j/, ":j:");
        break;
      case "k":
        new_text[i] = new_text[i].replace(/k/, ":heroku:");
        break;
      case "l":
        new_text[i] = new_text[i].replace(/l/, ":ltc:");
        break;
      case "m":
        new_text[i] = new_text[i].replace(/m/, ":xmr:");
        break;
      case "n":
        new_text[i] = new_text[i].replace(/n/, ":netflix:");
        break;
      case "o":
        new_text[i] = new_text[i].replace(/o/, ":opera:");
        break;
      case "p":
        new_text[i] = new_text[i].replace(/p/, ":paypal:");
        break;
      case "q":
        new_text[i] = new_text[i].replace(/q/, ":quora:");
        break;
      case "r":
        new_text[i] = new_text[i].replace(/r/, ":r:");
        break;
      case "s":
        new_text[i] = new_text[i].replace(/s/, ":skype:");
        break;
      case "t":
        new_text[i] = new_text[i].replace(/t/, ":tumblr:");
        break;
      case "u":
        new_text[i] = new_text[i].replace(/u/, ":uber:");
        break;
      case "v":
        new_text[i] = new_text[i].replace(/v/, ":vine:");
        break;
      case "w":
        new_text[i] = new_text[i].replace(/w/, ":wordpress:");
        break;
      case "x":
        new_text[i] = new_text[i].replace(/x/, ":doubt:");
        break;
      case "y":
        new_text[i] = new_text[i].replace(/y/, ":ycombinator:");
        break;
      case "z":
        new_text[i] = new_text[i].replace(/z/, ":zcash:");
        break;
    }
  }
  text = new_text.join("");
  bot.postMessage(data.channel, text);
}

// :edge::xmr::opera::j::incredibles:     :tumblr::r::adobe::netflix::skype::ava::adobe::tumblr::edge: