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
    // remove srcEl's dragged classes and the current spot's hover class
    $(srcEl).removeClass('being-dragged');
    $(this).removeClass('over');

    // take srcEl's piece-* class and apply it to this one
    var newClass = $.grep($(srcEl).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    });

    if (newClass) { 
      newClass = newClass[0]; 
    }
    else {
      console.log('something went wrong at drop-swap event');
    }

    $(this).addClass(newClass);
    $(srcEl).removeClass(newClass);
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
