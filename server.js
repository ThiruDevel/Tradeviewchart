var express          = require("express");
var http             = require("http");
var app              = express();
const bodyParser     = require('body-parser');
var cookieParser     = require('cookie-parser');
var url              = require("url"),
symbolsDatabase      = require("./symbols_database"),
RequestProcessor     = require("./request-processor").RequestProcessor;
var requestProcessor = new RequestProcessor(symbolsDatabase);


let server = http.createServer(app);

var port = 4112;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//DB connections

// mongoose.connect('mongodb://traingengine:traingengine1616@ds245523.mlab.com:45523/traingengine');

app.set('views','./templates');


app.set('port', port);
//home page

app.get('/chart/:config', (request,response) => {
  var uri = url.parse(request.url, true);
  var action = uri.pathname;
  switch (action) {
    case '/chart/config':
      action = '/config';
      break;
    case '/chart/time':
      action = '/time';
      break;
    case '/chart/symbols':
      symbolsDatabase.initGetAllMarketsdata();
      action = '/symbols';
      break;
    case '/chart/history':
      action = '/history';
      break;
  }
  return requestProcessor.processRequest(action, uri.query, response);
});

server.listen(port, () => {
  console.log('Server listening on : %d', port);
})






