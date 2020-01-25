const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./geocode');
const forecast = require('./forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sokhibjon Makhmudov'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sokhibjon Makhmudov'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Sokhibjon Makhmudov'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'An address is required' });
  }
  geocode(req.query.address, (error, { long, lat, location }) => {
    if (error) {
      return res.send(error);
    }
    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sokhibjon Makhmudov',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sokhibjon Makhmudov',
    errorMessage: 'Page not found'
  });
});

// location: body.features[0].place_name,
// long: body.features[0].center[1],
// lat: body.features[0].center[0]

app.listen(5000, () => {
  console.log('Express is running on port 5000');
});
