#!/usr/bin/env bash

./node_modules/.bin/nodemon --inspect --exec babel-node src/app.js --use_strict --source-maps --ignore 'db.json'