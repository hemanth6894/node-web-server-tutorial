const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
})

app.use((req, res, next) => {
  res.render("maintenance.hbs")
})

//To set up a handler for HTTP GET request, we use get(), it has 2 args,
//url, function to run if that url is reached.
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to home page, Master!'
  });
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    currentYear: new Date().getFullYear(),
  });
})

app.get('/bad', (req, res) => {
  res.send({errorMessage: 'This is a test error! No need to panic :)'});
})
app.listen(3000, () => {
  console.log('Server is up on port 3k');
});
