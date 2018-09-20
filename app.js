import express from 'express';
import bodyParser from 'body-parser'
import passport from 'passport';
//mport { MongoClient } from 'mongodb';
var MongoClient = require('mongodb').MongoClient

var LocalStrategy = require('passport-local').Strategy;

import shows from './db/shows';
import releases from './db/releases';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const V1_BASE_URL = '/api/v1/';

// SHOWS

// -- GET shows

app.get(`${V1_BASE_URL}shows`, (req, res) => {
  res.status(200).send({
    success: 'true',
    shows: shows
  })
});

// -- POST show

app.post(`${V1_BASE_URL}shows`, (req, res) => {
  if(!req.body.date) {
    return res.status(400).send({
      success: 'false',
      message: 'date is required'
    });
  }

  const show = {
            id: req.body.date,
            date: req.body.date,
            city: req.body.city,
            state: req.body.state,
            venue: req.body.venue,
            otherBands: req.body.otherBands,
            eventLink: req.body.facebookLink,
            ticketLink: req.body.ticketLink
        }
  shows.push(show);

  return res.status(201).send({
    success: 'true',
    show
  })
});

// -- PUT show

// -- DELETE show

app.delete(`${V1_BASE_URL}shows/:id`, (req, res) => {
  const id = parseInt(req.params.id, 10);

  shows.map((show, index) => {
    console.log(show.id);
    if (show.id === id) {
      const deletedShow = show;
      shows.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Show deleted successfully',
        deletedShow
      });
    }
  });

  return res.status(400).send({
    success: 'false',
    message: 'show not found'
  });
});

// RELEASES

app.get('/api/v1/releases', (req, res) => {
  res.status(200).send({
    success: 'true',
    releases: releases
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
