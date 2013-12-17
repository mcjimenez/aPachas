'use strict'

var EURO = "€";

function Pay(grp, from, to, date, amount, concept, currency) {
  this.grp = grp;
  this.from = from;
  this.to = to;
  this.date = date;
  this.amount = amount;
  this.concept = concept;
  this.currency = currency || EURO;
}

Pay.prototype = {
  
}
