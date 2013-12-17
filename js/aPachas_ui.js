'use strict';

const UI = (function() {

  var addGrpview = document.querySelector('#addGrp-view');
  var addGrpOpen = document.querySelector('#add-grp');
  addGrpOpen.addEventListener('click', function(e) {
    addGrpview.dataset.pagePosition = 'viewport';
  });

  var addGrpDone = document.querySelector('#addGrp-done');
  addGrpDome.addEventListener('click', function(e) {
    addGrpview.dataset.pagePosition = 'bottom';
  });

}());