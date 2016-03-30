(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .service('UserSessionService', ['$http', function($http) {

    var self = this;

    self.getCurrentUser = function(){
      return $http.get('/api/c_user').then(function(response){
        return response.data;
      });
    };
  }]);
}());
