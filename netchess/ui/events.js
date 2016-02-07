module.exports = exports = (function() {

  var $ = require('jquery');
  var squares = $('.square');

  var srcEl = null;

  var dragStart = function(ev) {
    srcEl = this;
    ev.dataTransfer.effectAllowed = 'all';
    $(ev.target).addClass('being-dragged');  
    console.log('dragstart');
  };

  var dragEnter = function(ev) {
    $(this).addClass('over');  
    console.log('dragenter');
  };

  var dragOver = function(ev) {
    ev.preventDefault();
    console.log('dragover');
  };

  var dragLeave = function(ev) {
    $(ev.target).removeClass('over');  
    console.log('dragleave');
  };

  var drop = function(ev) {
    ev.stopPropagation();
    $(this).removeClass('over');
    $(srcEl).removeClass('being-dragged');
    console.log('drop');
  };

  squares.each(function(s) {
    this.addEventListener('dragstart', dragStart);
    this.addEventListener('dragenter', dragEnter);
    this.addEventListener('dragover', dragOver);
    this.addEventListener('dragleave', dragLeave);
    this.addEventListener('drop', drop);
  });

}());
