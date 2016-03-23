(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('RequestController', ['LocationService', function(LocationService) {

    var self = this;
    self.formClass = 'hidden';

    self.showForm = function () {
        self.formClass = 'col-lg-12';
    };

  }]);
  
}());
