module.exports = exports = (function() {

  var $ = require('jquery');
  var squares = $('.square');

  var srcEl = null;

  var dragStart = function(ev) {
    srcEl = this;
    ev.dataTransfer.effectAllowed = 'all';
    ev.dataTransfer.setData('text/plain',$(this).css('background-image'));
    console.log($(this).css('background-image'));
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
    $(srcEl).removeClass('being-dragged');
    $(srcEl).removeClass('king');
    $(this).removeClass('over');
    $(this).addClass('king');
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
