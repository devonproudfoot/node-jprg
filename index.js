#!/bin/node

const Game = require('./src/events/Game');

const currentGame = new Game();

currentGame.playGame();