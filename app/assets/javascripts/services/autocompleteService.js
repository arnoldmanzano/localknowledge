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
    // console.log(self.predict);
    // var autocomplete = new google.maps.places.Autocomplete(autocompletebox);
    // console.log('inside initpredict');
    // console.log(autocomplete);
    // google.maps.event.addListener(autocompletebox, 'keypress', function() {
    //   var place = autocomplete.getPlace();
    //   // LocationService.centerMapOnAddress(place);
    //   console.log('Inside add listener');
    // });
    //
    // self.predict.addListener(autocompletebox, 'keypress', function(){
    //   AutocompleteService.predict.getQueryPredictions({ input: searchInput }, AutocompleteService.displaySuggestions);
    //
    // });
  };


  //
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

  // var placeSearch, autocomplete;
  // var componentForm = {
  //   location: 'short_name',
  //   route: 'long_name',
  //   locality: 'long_name',
  //   administrative_area_level_1: 'short_name',
  //   country: 'long_name',
  //   postal_code: 'short_name'
  // };

//   self.initAutocomplete = function(){
//   // Create the autocomplete object, restricting the search to geographical
//   // location types.
//
//   autocomplete = new google.maps.places.Autocomplete((document.getElementById('location')),
//       {types: ['geocode']});
//       autocomplete.addListener('place_changed', self.fillInAddress());
//   // When the user selects an address from the dropdown, populate the address
//   // fields in the form.
// };
//
//
// self.fillInAddress = function() {
//   // Get the place details from the autocomplete object.
//   var place = autocomplete.getPlace();
// console.log(place);
//     document.getElementById('.formcontrol#location').value = '';
//     document.getElementById('location').disabled = false;
//     console.log(getElementById('location'));
//
//   // Get each component of the address from the place details
//   // and fill the corresponding field on the form.
//   for (var i = 0; i < place.address_components.length; i++) {
//     var addressType = place.address_components[i].types[0];
//     var formattedAddress = '';
//     if (componentForm[addressType]) {
//       var val = place.address_components[i][componentForm[addressType]];
//       document.getElementById('location').value = formattedAddress;
//     }
//   }
// };
}]);
}());
