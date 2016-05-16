var express = require('express'),
    PORT    = process.env.PORT || 3000,
    app     = express();

app.use(express.static('./dist'));


app.listen(PORT, function(err) {
  if (err) {
    console.log('error starting server', err);
  } else {
    console.log('server up and running on port', PORT);
  }
});
