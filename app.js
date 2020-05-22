const http = require('http');
const express = require('express');

const app = express();
app.set('port', 3001);

http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server on port ${app.get('port')}`);
});

app.use((req, res, next) => {
    if (req.url === '/') {
        res.end('<h1>Hello</h1>');
    } else {
        next();
    }
});

app.use((req, res, next) => {
  if (req.url === '/test') {
    throw new Error('Test error');
  } else {
    next();
  }
});

app.use( (req, res) => {
  res.send(404, '<h1>Error 404 not found</h1>')
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});
