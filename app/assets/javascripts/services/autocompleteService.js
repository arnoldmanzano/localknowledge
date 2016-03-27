(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('AutocompleteService', [ function() {

var self = this;
var suggestions = [];



  self.initAutocomplete = function(searchInput) {
    var autocomplete = new google.maps.places.AutocompleteService();
    autocomplete.getQueryPredictions({ input: searchInput }, self.displaySuggestions);
  };

  self.displaySuggestions = function(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      console.log(status);
      return;
    }
    predictions.forEach(function(prediction) {
      suggestions.push(prediction.description);
    });
  };

    self.makeSuggestions = function(){
      return suggestions.slice(0,5);
    };
}]);
}());
