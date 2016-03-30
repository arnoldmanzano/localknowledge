(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('AutocompleteService', [ function() {

var self = this;
var suggestions = [];
self.predict = {};

var autocompletebox = document.getElementById("#autocompletebox");

  self.initPredict = function() {
    self.predict = new google.maps.places.AutocompleteService();
  };

  self.updateSuggestions = function(searchInput){
      self.predict.getQueryPredictions({ input: searchInput }, self.displaySuggestions);
  };

  self.displaySuggestions = function(predictions, status) {
    suggestions = [];
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    predictions.forEach(function(prediction) {
      suggestions.push(prediction);
    });
  };

  self.makeSuggestions = function(){
    return suggestions.slice(0,10);
  };

}]);
}());
