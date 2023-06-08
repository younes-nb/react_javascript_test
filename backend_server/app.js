const fs = require('fs');

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const Fuse = require('fuse.js');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// reading the file
const countries = JSON.parse(fs.readFileSync(`${__dirname}/countries.json`));

// searching
const options = {
  includeScore: true,
  keys: [
    {
      name: 'name',
      weight: 0.99,
    },
    {
      name: 'code',
      weight: 0.01,
    },
  ],
};

// initialize
const fuse = new Fuse(countries, options);
let fuseResult;

app.get('/', (req, res) => {
  const query = req.query.q;
  fuseResult = fuse.search(query).slice(0, 10);

  return res.status(200).json({
    status: 'success',
    data: {
      results: fuseResult,
    },
  });
});

let points = [{ x: '2359', y: 1000 }];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createNewPoint = () => {
  const { x: lastX, y: lastY } = points[points.length - 1];

  const lastXHour = +lastX.substring(0, 2);
  const lastXMin = +lastX.substring(2, 4);

  const newXMin = lastXMin + 1 < 60 ? `${lastXMin + 1}`.padStart(2, '0') : '00';
  let newXHour =
    newXMin !== '00'
      ? `${lastXHour}`.padStart(2, '0')
      : `${lastXHour + 1}`.padStart(2, '0');
  if (newXHour === '24') {
    newXHour = '00';
  }
  const newX = `${newXHour}${newXMin}`;
  const newY = getRandomInt(lastY - 10, lastY + 10);
  points = [points[points.length - 1], { x: newX, y: newY }];
  console.log('Point created: ', points[points.length - 1]);
};

app.get('/chart/:country', (req, res) => {
  const { country } = req.params;
  const item = countries.find((el) => el.code === country);

  if (!item) {
    res.status(400).json({
      status: 'fail',
      message: `You didn't provide correct country code`,
    });
  } else {
    console.log('received country: ', item);
    createNewPoint();

    res.status(200).json({
      status: 'success',
      data: points[points.length - 1],
    });
  }
});

module.exports = app;
