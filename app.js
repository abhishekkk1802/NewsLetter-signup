// jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  //   console.log(firstname, lastname, email);

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  app.post('/failure', function (req, res) {
    res.redirect('/');
  });

  const jsonData = JSON.stringify(data);
  const url = 'https://us10.api.mailchimp.com/3.0/lists/a4917323b7';

  const Options = {
    method: 'POST',
    auth: 'abhishek_1802:e53209b538d0ef936f04da517670bd94-us10',
  };

  const request = https.request(url, Options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    response.on('data', function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT, function () {
  console.log('server is running on port 3000');
});

// 0fad9265b17e3a828290fba45a0c804e-us10
// d042a96a68
