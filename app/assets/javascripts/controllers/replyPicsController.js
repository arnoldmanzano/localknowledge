(function() {
  'use strict';

  angular
    .module('LocalKnowledgeApp')
    .controller('ReplyPicsController', ['$http', function($http) {

    var self = this;

    self.getImages = function(reply_id) {
      var url = 'api/reply/' + reply_id;
      $http.get(url).then(function(response) {
        console.log(response);
      });
    };

    // self.images = [
    //   {thumb: 'system/pictures/images/000/000/001/thumb/3.jpg', img: 'system/pictures/images/000/000/001/original/3.jpg'},
    //   {thumb: 'system/pictures/images/000/000/002/thumb/4.jpg', img: 'system/pictures/images/000/000/002/original/4.jpg'},
    //   {thumb: 'system/pictures/images/000/000/003/thumb/5.jpg', img: 'system/pictures/images/000/000/003/original/5.jpg'},
    //   {thumb: 'system/pictures/images/000/000/004/thumb/6.jpg', img: 'system/pictures/images/000/000/004/original/6.jpg'}
    // ];

  }]);
}());
