(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('ReplyPicsController', ['$http', function($http) {

    var self = this;
    self.images = {};

    self.getImages = function(reply_id) {
      var url = 'api/reply/' + reply_id;
      $http.get(url).then(function(response) {
        self.images = response.data;
        self.showImages = true;
      });
    };
    
  }]);
}());
