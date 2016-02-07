'use strict';
var util = require('util');
var app = require('./netchess/main');
var $ = require('jquery');

app.run();

var square = document.querySelector('#row0 .square:first-child');

// handlers
var dragStart = function(ev) {
  $(this).addClass('move-source');
  console.log('dragstart');
};
var dragEnter = function(ev) {
  $(this).addClass('move-destination');
  console.log('dragenter');
};
var dragLeave = function(ev) {
  ev.preventDefault();
  $(this).removeClass('move-destination');
  console.log('dragleave');
};
var dragOver = function(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  console.log('dragover');
  return false;
};
var dragOut = function(ev) {
  ev.preventDefault();
  console.log('dragover');
};
var drop = function(ev) {
  ev.preventDefault();
  console.log('dragdrop');
};

square.addEventListener('dragstart', dragStart);
square.addEventListener('dragenter', dragEnter);
square.addEventListener('dragleave', dragLeave);
square.addEventListener('dragover', dragOver);
square.addEventListener('dragout', dragOut);
square.addEventListener('drop', drop);
