/* emoji-translate
Translates your sentences into emoji!
Jack Margeson, 2019 */

// requirements
const slackBot = require('slackbots')

// node.js server
const http = require('http')
const handle = (req, res) => {
  res.end('hit')
}
const server = http.createServer(handle)
server.listen(process.env.PORT || 5000)

// create bot user
const bot = new slackBot({
  token: '',
  name: 'emoji-translate'
})

// error handler
bot.on('error', err => {
  console.log(err)
  bot.postMessageToUser(
    'margeson.jack',
    'An error has occured. Check the console log for more details.'
  )
})

// startup function
bot.on('start', () => {
  // bot.postMessageToChannel('emoji-translate', 'Hello, world!');
  // bot.postMessageToUser('margeson.jack', 'emoji-translate is now online.');
  console.log('\033[2J') // clear console
  console.log(`emoji-translate is now online.
Searching for messages…`)
})

// message handler
bot.on('message', data => {
  if (
    data.subtype == 'bot_message' || // excludes bot messages
    data.type !== 'message' || // excludes non-messages
    data.thread_ts != undefined // excludes threaded messages
  ) {
    return
  } else if (data.text.startsWith('<@UM4MZNRGU> ')) {
    info(data)
    translate(data)
  }
})

function info(data) {
  console.log('\033[2J') // clear console
  console.log(
    `emoji-translate
Bot's user ID: id
---------------
`,
    data
  )
}

const replacements = {
  a: 'adobe',
  b: 'btc',
  c: 'stone_space',
  d: 'dtrain',
  e: 'edge',
  f: 'facebook',
  g: 'google',
  h: 'hack_club',
  i: 'incredibles',
  j: 'j',
  k: 'heroku',
  l: 'ltc',
  m: 'xmr',
  n: 'netflix',
  o: 'opera',
  p: 'paypal',
  q: 'quora',
  r: 'r',
  s: 'skype',
  t: 'tumblr',
  u: 'uber',
  v: 'vine',
  w: 'wordpress',
  x: 'doubt',
  y: 'ycombinator',
  z: 'zcash'
}

function translate(data) {
  text = data.text
    .replace('<@UM4MZNRGU> ', '')
    .replace(/ /g, '     ')
    .replace(/[^a-zA-Z ]/g, '')
    .toLowerCase()
  const results = []
  text.split('').map(letter => {
    results.push(`:${replacements[letter] || letter}:`)
  })
  const result = results.join('')
  bot.postMessage(data.channel, results)
}

// :edge::xmr::opera::j::incredibles:     :tumblr::r::adobe::netflix::skype::ava::adobe::tumblr::edge:
